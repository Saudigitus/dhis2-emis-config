import React from 'react';

interface LabelEmptySlotProps {
    slotNumber: number;
}

export const LabelEmptySlot: React.FC<LabelEmptySlotProps> = ({ slotNumber }) => {
    return (
        <div className="lm-chip-empty-slot">
            <span className="lm-chip-empty-badge">{slotNumber}</span>
            <span className="lm-chip-empty-text">Empty</span>
        </div>
    );
};