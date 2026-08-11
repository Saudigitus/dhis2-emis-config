import { useState, useMemo } from 'react';

import './CardLayoutConfigurator.css';
import { CardLayoutItem, GroupDef, Block } from './types';

const ALL_ATTRIBUTES = [
    { key: 'fullName', label: 'Nome completo' },
    { key: 'systemId', label: 'Código do sistema' },
    { key: 'dateOfBirth', label: 'Data de nascimento' },
    { key: 'gender', label: 'Sexo' },
    { key: 'nationality', label: 'Nacionalidade' },
    { key: 'enrollmentStatus', label: 'Estado de matrícula' },
    { key: 'guardian', label: 'Encarregado' },
    { key: 'guardianContact', label: 'Contacto do encarregado' },
    { key: 'distanceToSchool', label: 'Distância à escola' },
    { key: 'modeOfTransport', label: 'Meio de transporte' },
    { key: 'foodProgramme', label: 'Programa alimentar' },
    { key: 'disability', label: 'Deficiência' },
    { key: 'orphanStatus', label: 'Estado de orfandade' },
    { key: 'householdIncome', label: 'Rendimento familiar' },
    { key: 'numberOfSiblings', label: 'Número de irmãos' },
];

const SECTIONS = [
    { id: 1, headerLabel: 'Section 1 · Names', placeholder: 'Add attribute…', max: 5 },
    { id: 2, headerLabel: 'Section 2 · Subtitle', placeholder: 'Add attribute…', max: 5 },
    { id: 3, headerLabel: 'Section 3 · Tags', placeholder: 'Add attribute…', max: 5 },
];

function buildBlocks(sectionItems: CardLayoutItem[]): Block[] {
    const blocks: Block[] = [];
    for (const item of sectionItems) {
        if (item.groupId === null) {
            blocks.push({ type: 'standalone', items: [item] });
        } else {
            const last = blocks[blocks.length - 1];
            if (last && last.type === 'group' && last.groupId === item.groupId) {
                last.items.push(item);
            } else {
                blocks.push({ type: 'group', groupId: item.groupId, groupName: item.groupName || `G${item.groupId}`, items: [item] });
            }
        }
    }
    return blocks;
}

interface Props {
    initialItems: CardLayoutItem[];
    onCancel?: () => void;
    onSaved?: () => void;
}

export function CardLayoutConfigurator({ initialItems, onCancel, onSaved }: Props) {
    const [items, setItems] = useState<CardLayoutItem[]>(initialItems);
    const [saving, setSaving] = useState(false);

    // Per-section group definitions
    const [sectionGroups, setSectionGroups] = useState<Record<number, GroupDef[]>>(() => {
        const map: Record<number, GroupDef[]> = { 1: [], 2: [], 3: [] };
        initialItems.forEach((item) => {
            if (item.groupId !== null && item.groupName) {
                const list = map[item.section] || [];
                if (!list.find((g) => g.id === item.groupId)) {
                    list.push({ id: item.groupId, name: item.groupName });
                }
                map[item.section] = list;
            }
        });
        return map;
    });

    // Active group per section: which group new attributes go to
    // null = standalone, number = groupId
    const [activeGroup, setActiveGroup] = useState<Record<number, number | 'standalone'>>({
        1: 'standalone',
        2: 'standalone',
        3: 'standalone',
    });

    // Create group modal state
    const [creatingInSection, setCreatingInSection] = useState<number | null>(null);
    const [newGroupName, setNewGroupName] = useState('');

    const usedKeys = useMemo(() => new Set(items.map((i) => i.fieldKey)), [items]);

    function itemsForSection(section: number) {
        return items.filter((i) => i.section === section).sort((a, b) => a.sortOrder - b.sortOrder);
    }

    function availableFor(sectionMax: number, sectionItemsLen: number) {
        return ALL_ATTRIBUTES.filter((a) => !usedKeys.has(a.key) && sectionItemsLen < sectionMax);
    }

    function addItem(sectionId: number, key: string) {
        const secConfig = SECTIONS.find((s) => s.id === sectionId);
        if (!secConfig) return;
        const current = itemsForSection(sectionId);
        if (current.length >= secConfig.max) return;
        const attr = ALL_ATTRIBUTES.find((a) => a.key === key);
        if (!attr) return;

        const groupMode = activeGroup[sectionId];
        let groupId: number | null = null;
        let groupName: string | null = null;

        if (groupMode !== 'standalone') {
            groupId = groupMode;
            const gdef = (sectionGroups[sectionId] || []).find((g) => g.id === groupId);
            groupName = gdef ? gdef.name : null;
        }

        setItems([
            ...items,
            { id: Date.now() + sectionId, section: sectionId, fieldKey: key, label: attr.label, sortOrder: current.length, groupId, groupName },
        ]);
    }

    function removeItem(fieldKey: string) {
        setItems(items.filter((i) => i.fieldKey !== fieldKey));
    }

    function confirmCreateGroup() {
        if (creatingInSection === null || !newGroupName.trim()) return;
        const sectionId = creatingInSection;
        const currentGroups = sectionGroups[sectionId] || [];
        const newId = currentGroups.length > 0 ? Math.max(...currentGroups.map((g) => g.id)) + 1 : 1;
        const name = newGroupName.trim();
        setSectionGroups({ ...sectionGroups, [sectionId]: [...currentGroups, { id: newId, name }] });
        setActiveGroup({ ...activeGroup, [sectionId]: newId });
        setCreatingInSection(null);
        setNewGroupName('');
    }

    function moveBlock(section: number, blockIdx: number, direction: 'left' | 'right') {
        const sectionItems = itemsForSection(section);
        const blocks = buildBlocks(sectionItems);
        if (blockIdx < 0 || blockIdx >= blocks.length) return;
        const targetIdx = direction === 'left' ? blockIdx - 1 : blockIdx + 1;
        if (targetIdx < 0 || targetIdx >= blocks.length) return;

        const block = blocks[blockIdx];
        const target = blocks[targetIdx];
        const newItems = [...items];
        const blockFirstSort = block.items[0].sortOrder;
        const targetFirstSort = target.items[0].sortOrder;

        block.items.forEach((item, idx) => {
            const i = newItems.findIndex((x) => x.id === item.id);
            newItems[i] = { ...item, sortOrder: targetFirstSort + idx };
        });
        target.items.forEach((item, idx) => {
            const i = newItems.findIndex((x) => x.id === item.id);
            newItems[i] = { ...item, sortOrder: blockFirstSort + idx };
        });

        setItems(newItems);
    }

    async function handleSubmit() {
        setSaving(true);
        await fetch('/api/card-layout', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                items.map((i) => ({
                    section: i.section,
                    fieldKey: i.fieldKey,
                    label: i.label,
                    sortOrder: i.sortOrder,
                    groupId: i.groupId ?? null,
                    groupName: i.groupName ?? null,
                }))
            ),
        });
        setSaving(false);
        onSaved?.();
    }

    return (
        <div className="clc-root">
            <h2 className="clc-title">Identity card configuration</h2>

            {SECTIONS.map((sec, secIdx) => {
                const sectionItems = itemsForSection(sec.id);
                const count = sectionItems.length;
                const canAdd = count < sec.max;
                const available = availableFor(sec.max, count);
                const groupsInSection = sectionGroups[sec.id] || [];
                const blocks = buildBlocks(sectionItems);
                const isActiveGrouped = activeGroup[sec.id] !== 'standalone';
                const activeGdef = isActiveGrouped ? groupsInSection.find((g) => g.id === activeGroup[sec.id]) : null;

                return (
                    <div key={sec.id} className="clc-section">
                        {/* Header row */}
                        <div className="clc-header">
                            <div className="clc-header-left">
                                <span className="clc-icon-slate">
                                    <svg className="clc-icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <span className="clc-header-label">{sec.headerLabel}</span>
                                <span className="clc-fixed-badge">
                                    Fixed to {sec.max}
                                </span>
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                {/* Attribute select */}
                                <div className="clc-select-wrap">
                                    <select
                                        value=""
                                        onChange={(e) => { if (e.target.value) addItem(sec.id, e.target.value); }}
                                        disabled={!canAdd || available.length === 0}
                                        className="clc-select"
                                    >
                                        <option value="">{sec.placeholder}</option>
                                        {available.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}
                                    </select>
                                    <span className="clc-select-chevron">
                                        <svg className="clc-icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                    </span>
                                </div>

                                {/* Active group badge */}
                                {isActiveGrouped && activeGdef && (
                                    <span className="clc-group-badge">
                                        <svg className="clc-icon-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.861-2.578a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.217 8.688" /></svg>
                                        {activeGdef.name}
                                    </span>
                                )}

                                {/* Group mode toggle */}
                                <div className="clc-group-toggle">
                                    <span className="clc-group-toggle-label">Group:</span>
                                    <div className="clc-group-select-wrap">
                                        <select
                                            value={activeGroup[sec.id] === 'standalone' ? 'standalone' : `gid:${activeGroup[sec.id]}`}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === 'new') {
                                                    setCreatingInSection(sec.id);
                                                } else if (val === 'standalone') {
                                                    setActiveGroup({ ...activeGroup, [sec.id]: 'standalone' });
                                                } else if (val.startsWith('gid:')) {
                                                    setActiveGroup({ ...activeGroup, [sec.id]: parseInt(val.split(':')[1], 10) });
                                                }
                                            }}
                                            className="clc-group-select"
                                        >
                                            <option value="standalone">Standalone</option>
                                            <option value="new">+ Create new…</option>
                                            {groupsInSection.map((g) => (
                                                <option key={g.id} value={`gid:${g.id}`}>{g.name}</option>
                                            ))}
                                        </select>
                                        <span className="clc-group-select-chevron">
                                            <svg className="clc-icon-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dashed area — blocks rendering */}
                        <div className="clc-dropzone">
                            {count === 0 ? (
                                <div className="clc-empty">
                                    <div className="clc-empty-subtitle">Choose an attribute above. Max {sec.max}.</div>
                                </div>
                            ) : (
                                <div className="clc-blocks">
                                    {blocks.map((block, blockIdx) => (
                                        <div key={blockIdx} className="clc-block">
                                            {block.type === 'group' && (
                                                <span className="clc-block-group-tag">
                                                    {block.groupName}
                                                </span>
                                            )}
                                            {block.items.map((item) => {
                                                const globalIdx = sectionItems.findIndex((x) => x.id === item.id);
                                                return (
                                                    <div
                                                        key={item.fieldKey}
                                                        className={`clc-chip ${block.type === 'group' ? 'clc-chip-group' : 'clc-chip-standalone'}`}
                                                    >
                                                        <span className="clc-chip-index">{globalIdx + 1}</span>
                                                        <span>{item.label}</span>
                                                        <div className="clc-chip-actions">
                                                            <button onClick={() => moveBlock(sec.id, blockIdx, 'left')} disabled={blockIdx === 0} className="clc-chip-btn">
                                                                <svg className="clc-icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                                                            </button>
                                                            <button onClick={() => moveBlock(sec.id, blockIdx, 'right')} disabled={blockIdx === blocks.length - 1} className="clc-chip-btn">
                                                                <svg className="clc-icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                                                            </button>
                                                        </div>
                                                        <button onClick={() => removeItem(item.fieldKey)} className="clc-chip-btn clc-chip-remove" title="Remove">
                                                            <svg className="clc-icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {secIdx < SECTIONS.length - 1 && <div className="clc-divider" />}
                    </div>
                );
            })}

            <div className="clc-hint">
                <span className="clc-hint-dot">•</span>
                <span>Horizontal ordering · Groups move together.</span>
            </div>

            {/* Create group modal */}
            {creatingInSection !== null && (
                <div className="clc-modal-overlay">
                    <div className="clc-modal">
                        <h3 className="clc-modal-title">New group name</h3>
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="e.g. Family, Academic, ID…"
                            className="clc-modal-input"
                            autoFocus
                            onKeyDown={(e) => { if (e.key === 'Enter') confirmCreateGroup(); if (e.key === 'Escape') { setCreatingInSection(null); setNewGroupName(''); } }}
                        />
                        <div className="clc-modal-actions">
                            <button onClick={() => { setCreatingInSection(null); setNewGroupName(''); }} className="clc-btn clc-btn-secondary clc-btn-sm">Cancel</button>
                            <button onClick={confirmCreateGroup} disabled={!newGroupName.trim()} className="clc-btn clc-btn-primary clc-btn-sm">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
