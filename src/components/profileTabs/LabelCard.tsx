import React from 'react';
import {
    IconCheckmarkCircle16,
    IconDelete16,
    IconDragHandle16,
    IconArrowLeft16,
    IconArrowRight16,
    IconEdit16,
} from '@dhis2/ui';
import { motion } from 'framer-motion';
import { LabelItem } from '../../types/profileTypes/profileTypes';

interface LabelCardProps {
    label: LabelItem;
    index: number;
    totalLabels: number;
    isEditing: boolean;
    editText: string;
    setEditText: (text: string) => void;
    onSaveEditing: (id: string) => void;
    onStartEditing: (label: LabelItem) => void;
    onDelete: (id: string) => void;
    onMoveLeft: (index: number) => void;
    onMoveRight: (index: number) => void;
    isDragging: boolean;
    isDragOver: boolean;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDrop: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
}

export const LabelCard: React.FC<LabelCardProps> = ({
    label,
    index,
    totalLabels,
    isEditing,
    editText,
    setEditText,
    onSaveEditing,
    onStartEditing,
    onDelete,
    onMoveLeft,
    onMoveRight,
    isDragging,
    isDragOver,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="lm-chip-motion-wrap"
        >
            <div
                draggable={!isEditing}
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDrop={(e) => onDrop(e, index)}
                onDragEnd={onDragEnd}
                className={`lm-chip ${isDragging ? 'is-dragging' : isDragOver ? 'is-drag-over' : ''}`}
            >
                {/* Top Row */}
                <div className="lm-chip-top-row">
                    <span className="lm-chip-order-badge">{index + 1}</span>
                    <div className="lm-chip-drag-handle" title="Drag to reorder">
                        <IconDragHandle16 />
                    </div>
                </div>

                {/* Middle Row */}
                <div className="lm-chip-middle">
                    {isEditing ? (
                        <div className="lm-chip-edit-row">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSaveEditing(label.id)}
                                autoFocus
                                className="lm-chip-edit-input"
                            />
                            <button
                                type="button"
                                onClick={() => onSaveEditing(label.id)}
                                className="lm-chip-save-btn"
                                title="Save changes"
                            >
                                <IconCheckmarkCircle16 />
                            </button>
                        </div>
                    ) : (
                        <span className={`lm-chip-badge ${label.color || 'lm-default-color'}`}>
                            {label.text}
                        </span>
                    )}
                </div>

                {/* Bottom Row */}
                <div className="lm-chip-bottom-row">
                    <div className="lm-chip-arrows">
                        <button
                            type="button"
                            onClick={() => onMoveLeft(index)}
                            disabled={index === 0}
                            title="Move Left"
                            className={`lm-chip-arrow-btn ${index === 0 ? 'is-disabled' : 'is-enabled'}`}
                        >
                            <IconArrowLeft16 />
                        </button>
                        <button
                            type="button"
                            onClick={() => onMoveRight(index)}
                            disabled={index === totalLabels - 1}
                            title="Move Right"
                            className={`lm-chip-arrow-btn ${
                                index === totalLabels - 1 ? 'is-disabled' : 'is-enabled'
                            }`}
                        >
                            <IconArrowRight16 />
                        </button>
                    </div>

                    <div className="lm-chip-actions">
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => onStartEditing(label)}
                                title="Rename label"
                                className="lm-chip-action-btn lm-edit-btn"
                            >
                                <IconEdit16 />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => onDelete(label.id)}
                            title="Remove label"
                            className="lm-chip-action-btn lm-delete-btn"
                        >
                            <IconDelete16 />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};