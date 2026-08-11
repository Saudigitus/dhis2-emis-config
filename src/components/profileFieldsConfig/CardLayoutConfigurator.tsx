import { useEffect, useMemo, useState } from 'react';

import './CardLayoutConfigurator.css';
import { CardLayoutItem, GroupDef } from './types';
import { ALL_ATTRIBUTES, SECTIONS } from './cardLayout/constants';
import { buildBlocks } from './cardLayout/buildBlocks';
import { LayoutSection } from './cardLayout/LayoutSection';
import { CreateGroupModal } from './cardLayout/CreateGroupModal';

interface Props {
    items: CardLayoutItem[];
    setItems: (items: CardLayoutItem[]) => void;
}

export function CardLayoutConfigurator({ items, setItems }: Props) {
    // Per-section group definitions
    const [sectionGroups, setSectionGroups] = useState<Record<number, GroupDef[]>>(() => {
        const map: Record<number, GroupDef[]> = {
            1: [],
            2: [],
            3: [],
        };

        items?.forEach((item) => {
            if (
                item.groupId !== null &&
                item.groupId !== undefined &&
                item.groupName
            ) {
                const list = map[item.section] || [];

                if (!list.find((g) => g.id === item.groupId)) {
                    list.push({
                        id: item.groupId,
                        name: item.groupName,
                    });
                }

                map[item.section] = list;
            }
        });

        return map;
    });

    /**
     * Active group per section.
     * undefined = no group selected.
     *
     * There is intentionally no "standalone" option.
     */
    const [activeGroup, setActiveGroup] = useState<Record<number, number | undefined>>({});

    // Create group modal state
    const [creatingInSection, setCreatingInSection] = useState<number | null>(null);
    const [newGroupName, setNewGroupName] = useState('');

    const usedKeys = useMemo(
        () => new Set(items.map((i) => i.fieldKey)),
        [items]
    );

    /**
     * Remove any legacy standalone items.
     *
     * Every item must have a group.
     */
    useEffect(() => {
        const groupedItems = items.filter(
            (item) =>
                item.groupId !== null &&
                item.groupId !== undefined &&
                item.groupName
        );

        if (groupedItems.length !== items.length) {
            setItems(groupedItems);
        }
    }, [items, setItems]);

    /**
     * If a section has groups but no active group,
     * automatically select the first available group.
     */
    useEffect(() => {
        const nextActiveGroup = { ...activeGroup };
        let changed = false;

        SECTIONS.forEach((section) => {
            const groups = sectionGroups[section.id] || [];

            if (
                groups.length > 0 &&
                !groups.some((group) => group.id === activeGroup[section.id])
            ) {
                nextActiveGroup[section.id] = groups[0].id;
                changed = true;
            }
        });

        if (changed) {
            setActiveGroup(nextActiveGroup);
        }
    }, [sectionGroups, activeGroup]);

    function itemsForSection(section: number) {
        return items
            .filter((i) => i.section === section)
            .sort((a, b) => a.sortOrder - b.sortOrder);
    }

    function availableFor(sectionMax: number, sectionItemsLen: number) {
        return ALL_ATTRIBUTES.filter(
            (a) =>
                !usedKeys.has(a.key) &&
                sectionItemsLen < sectionMax
        );
    }

    function addItem(sectionId: number, key: string) {
        const secConfig = SECTIONS.find((s) => s.id === sectionId);

        if (!secConfig) return;

        const current = itemsForSection(sectionId);

        if (current.length >= secConfig.max) return;

        const attr = ALL_ATTRIBUTES.find((a) => a.key === key);

        if (!attr) return;

        /**
         * A field cannot be added without a group.
         */
        const groupId = activeGroup[sectionId];

        if (groupId === undefined) {
            return;
        }

        const gdef = (sectionGroups[sectionId] || []).find(
            (g) => g.id === groupId
        );

        if (!gdef) {
            return;
        }

        setItems([
            ...items,
            {
                id: Date.now() + sectionId,
                section: sectionId,
                fieldKey: key,
                label: attr.label,
                sortOrder: current.length,
                groupId,
                groupName: gdef.name,
            },
        ]);
    }

    function removeItem(fieldKey: string) {
        setItems(items.filter((i) => i.fieldKey !== fieldKey));
    }

    function confirmCreateGroup() {
        if (creatingInSection === null || !newGroupName.trim()) {
            return;
        }

        const sectionId = creatingInSection;
        const currentGroups = sectionGroups[sectionId] || [];

        const newId =
            currentGroups.length > 0
                ? Math.max(...currentGroups.map((g) => g.id)) + 1
                : 1;

        const name = newGroupName.trim();

        setSectionGroups({
            ...sectionGroups,
            [sectionId]: [
                ...currentGroups,
                {
                    id: newId,
                    name,
                },
            ],
        });

        // Automatically select the newly created group.
        setActiveGroup({
            ...activeGroup,
            [sectionId]: newId,
        });

        setCreatingInSection(null);
        setNewGroupName('');
    }

    function moveBlock(
        section: number,
        blockIdx: number,
        direction: 'left' | 'right'
    ) {
        const sectionItems = itemsForSection(section);
        const blocks = buildBlocks(sectionItems);

        if (blockIdx < 0 || blockIdx >= blocks.length) return;

        const targetIdx =
            direction === 'left'
                ? blockIdx - 1
                : blockIdx + 1;

        if (targetIdx < 0 || targetIdx >= blocks.length) return;

        const block = blocks[blockIdx];
        const target = blocks[targetIdx];

        const newItems = [...items];

        const blockFirstSort = block.items[0].sortOrder;
        const targetFirstSort = target.items[0].sortOrder;

        block.items.forEach((item, idx) => {
            const i = newItems.findIndex((x) => x.id === item.id);

            newItems[i] = {
                ...item,
                sortOrder: targetFirstSort + idx,
            };
        });

        target.items.forEach((item, idx) => {
            const i = newItems.findIndex((x) => x.id === item.id);

            newItems[i] = {
                ...item,
                sortOrder: blockFirstSort + idx,
            };
        });

        setItems(newItems);
    }

    async function handleSubmit() {
        console.log(items);
    }

    return (
        <div className="clc-root">
            <h2 className="clc-title">
                Identity card configuration
            </h2>

            {SECTIONS.map((sec, secIdx) => {
                const sectionItems = itemsForSection(sec.id);
                const groupsInSection = sectionGroups[sec.id] || [];
                const blocks = buildBlocks(sectionItems);

                const selectedGroupId = activeGroup[sec.id];

                const activeGdef =
                    selectedGroupId !== undefined
                        ? groupsInSection.find(
                            (g) => g.id === selectedGroupId
                        )
                        : null;

                const canAdd = sectionItems.length < sec.max;
                const hasGroup = selectedGroupId !== undefined;

                const available = availableFor(
                    sec.max,
                    sectionItems.length
                );

                return (
                    <LayoutSection
                        key={sec.id}
                        section={sec}
                        sectionItems={sectionItems}
                        blocks={blocks}
                        groups={groupsInSection}
                        selectedGroupId={selectedGroupId}
                        activeGroupName={activeGdef ? activeGdef.name : null}
                        canAdd={canAdd}
                        hasGroup={hasGroup}
                        available={available}
                        showDivider={secIdx < SECTIONS.length - 1}
                        onAddItem={(key) => addItem(sec.id, key)}
                        onSelectGroup={(groupId) =>
                            setActiveGroup({
                                ...activeGroup,
                                [sec.id]: groupId,
                            })
                        }
                        onCreateGroup={() => setCreatingInSection(sec.id)}
                        onMoveBlock={(blockIdx, direction) =>
                            moveBlock(sec.id, blockIdx, direction)
                        }
                        onRemoveItem={removeItem}
                    />
                );
            })}

            <div className="clc-hint">
                <span className="clc-hint-dot">•</span>
                <span>
                    Horizontal ordering · Groups move together.
                </span>
            </div>

            {creatingInSection !== null && (
                <CreateGroupModal
                    value={newGroupName}
                    onChange={setNewGroupName}
                    onCreate={confirmCreateGroup}
                    onClose={() => {
                        setCreatingInSection(null);
                        setNewGroupName('');
                    }}
                />
            )}
        </div>
    );
}
