import React, { useState, useRef } from 'react';
import { IconCheckmarkCircle16, IconLink24, IconArrowLeft16, IconArrowRight16 } from '@dhis2/ui';
import { AnimatePresence } from 'framer-motion';
import { LabelItem, SortMode, LabelInputType, LabelOption } from '../../types/profileTypes/profileTypes';
import { DEFAULT_LABEL_COLORS } from '../../utils/constants/colors/colors';
import { LabelInputForm } from './LabelInputForm';
import { LabelCard } from './LabelCard';
import { LabelEmptySlot } from './LabelEmptySlot';

import './LabelManager.css';

const FIXED_MAX = 6;

export const LabelManager = ({
    labels,
    setLabels,
    inputType = 'text',
    options = [],
}: {
    labels: LabelItem[];
    setLabels: (labels: LabelItem[]) => void;
    inputType?: LabelInputType;
    options?: LabelOption[];
}) => {
    const [inputText, setInputText] = useState('');
    const [selectedColor, setSelectedColor] = useState(DEFAULT_LABEL_COLORS[0]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [sortMode, setSortMode] = useState<SortMode>('custom');

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const isMaxReached = labels?.length >= FIXED_MAX;

    /**
     * Options still available: those not currently selected as a label.
     * Removing a label automatically makes its option available again.
     */
    const availableOptions = options.filter(
        (option) =>
            !labels.some(
                (l) => l.text.toLowerCase() === option.label.toLowerCase()
            )
    );

    const selectedOption = inputType === 'list'
        ? options.find((o) => o.key === inputText)
        : undefined;

    const onLabelsChange = (newLabels: LabelItem[]) => setLabels(newLabels);

    const handleAddLabel = () => {
        setErrorMsg(null);

        const text = selectedOption?.label ?? inputText.trim();

        if (!text) {
            setErrorMsg(
                inputType === 'list'
                    ? 'Please select an option before clicking OK.'
                    : 'Please enter a label name before clicking OK.'
            );
            return;
        }

        if (isMaxReached) {
            setErrorMsg(`Maximum limit of ${FIXED_MAX} labels reached. Remove a label to add another.`);
            return;
        }

        if (labels.some((l: any) => l.text.toLowerCase() === text.toLowerCase())) {
            setErrorMsg(`Label "${text}" already exists.`);
            return;
        }

        const newLabel: LabelItem = {
            id: `label-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            text,
            color: `${selectedColor.bg} ${selectedColor.text} ${selectedColor.border}`,
            createdAt: Date.now(),
        };

        onLabelsChange([...labels, newLabel]);
        setInputText('');
        inputRef.current?.focus();
    };

    const handleDelete = (id: string) => {
        onLabelsChange(labels.filter((l: any) => l.id !== id));
        setErrorMsg(null);
    };

    const handleMove = (fromIndex: number, toIndex: number) => {
        if (toIndex < 0 || toIndex >= labels.length) return;
        const updated = [...labels];
        const temp = updated[fromIndex];
        updated[fromIndex] = updated[toIndex];
        updated[toIndex] = temp;
        setSortMode('custom');
        onLabelsChange(updated);
    };

    const startEditing = (label: LabelItem) => {
        setEditingId(label.id);
        setEditText(label.text);
    };

    const saveEditing = (id: string) => {
        const trimmed = editText.trim();
        if (!trimmed) return;

        if (labels.some((l: any) => l.id !== id && l.text.toLowerCase() === trimmed.toLowerCase())) {
            setErrorMsg(`Label name "${trimmed}" is already in use.`);
            return;
        }

        onLabelsChange(labels.map((l: any) => (l.id === id ? { ...l, text: trimmed } : l)));
        setEditingId(null);
        setEditText('');
        setErrorMsg(null);
    };

    const handleSortChange = (mode: SortMode) => {
        setSortMode(mode);
        if (mode === 'custom') return;

        const sorted = [...labels];
        const sortFns: Record<string, (a: LabelItem, b: LabelItem) => number> = {
            'alphabetical-asc': (a, b) => a.text.localeCompare(b.text),
            'alphabetical-desc': (a, b) => b.text.localeCompare(a.text),
            newest: (a, b) => b.createdAt - a.createdAt,
            oldest: (a, b) => a.createdAt - b.createdAt,
        };

        if (sortFns[mode]) {
            sorted.sort(sortFns[mode]);
            onLabelsChange(sorted);
        }
    };

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex !== null && dragOverIndex !== index) {
            setDragOverIndex(index);
        }
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            const updated = [...labels];
            const [movedItem] = updated.splice(draggedIndex, 1);
            updated.splice(dropIndex, 0, movedItem);
            setSortMode('custom');
            onLabelsChange(updated);
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const emptySlots = Math.max(0, FIXED_MAX - labels.length);

    return (
        <div className="lm-root">
            {/* {showMaxConfig && <LabelHeader currentCount={labels.length} fixedMax={FIXED_MAX} />} */}

            <div className="lm-input-section">
                <LabelInputForm
                    inputText={inputText}
                    setInputText={setInputText}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    onAddLabel={handleAddLabel}
                    isMaxReached={isMaxReached}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                    fixedMax={FIXED_MAX}
                    inputRef={inputRef}
                    inputType={inputType}
                    availableOptions={availableOptions}
                />
            </div>

            <div className="lm-list-section">
                <div className="lm-list-header">
                    <label className="lm-list-title">
                        <span>Labels List (Ordered) — Horizontal</span>
                        <span className="lm-list-count-badge">
                            {labels.length} / {FIXED_MAX}
                        </span>
                    </label>

                    {labels.length > 1 && (
                        <div className="lm-sort-control">
                            <IconCheckmarkCircle16 />
                            <span className="lm-sort-label">Order:</span>
                            <select
                                value={sortMode}
                                onChange={(e) => handleSortChange(e.target.value as SortMode)}
                                className="lm-sort-select"
                            >
                                <option value="custom">Custom (Drag or ← →)</option>
                                <option value="alphabetical-asc">A → Z</option>
                                <option value="alphabetical-desc">Z → A</option>
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    )}
                </div>

                {labels.length === 0 ? (
                    <div className="lm-empty-state">
                        <IconLink24 />
                        <p className="lm-empty-title">No labels listed yet</p>
                        <p className="lm-empty-subtitle">
                            {inputType === 'list' ? (
                                <>Select an option above and click <strong>"OK"</strong> to add it. Max {FIXED_MAX} labels. They will appear horizontally.</>
                            ) : (
                                <>Write a label name above and click <strong>"OK"</strong> to add it. Max {FIXED_MAX} labels. They will appear horizontally.</>
                            )}
                        </p>
                        <div className="lm-empty-slots-preview">
                            {Array.from({ length: FIXED_MAX }).map((_, i) => (
                                <div key={i} className="lm-empty-slot-preview">
                                    <span className="lm-empty-slot-preview-text">{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="lm-chips-row">
                        <AnimatePresence>
                            {labels.map((label: any, index: number) => (
                                <LabelCard
                                    key={label.id}
                                    label={label}
                                    index={index}
                                    totalLabels={labels.length}
                                    isEditing={editingId === label.id}
                                    editText={editText}
                                    setEditText={setEditText}
                                    onSaveEditing={saveEditing}
                                    onStartEditing={startEditing}
                                    onDelete={handleDelete}
                                    onMoveLeft={(idx) => handleMove(idx, idx - 1)}
                                    onMoveRight={(idx) => handleMove(idx, idx + 1)}
                                    isDragging={draggedIndex === index}
                                    isDragOver={dragOverIndex === index}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onDragEnd={() => {
                                        setDraggedIndex(null);
                                        setDragOverIndex(null);
                                    }}
                                />
                            ))}
                        </AnimatePresence>

                        {Array.from({ length: emptySlots }).map((_, idx) => (
                            <LabelEmptySlot
                                key={`empty-${idx}`}
                                slotNumber={labels.length + idx + 1}
                            />
                        ))}
                    </div>
                )}

                <p className="lm-footer-hint">
                    <span className="lm-footer-dot" />
                    Horizontal ordering • Drag chip or use <IconArrowLeft16 /> <IconArrowRight16 /> to reorder • Limit strictly {FIXED_MAX} labels
                </p>
            </div>
        </div>
    );
};