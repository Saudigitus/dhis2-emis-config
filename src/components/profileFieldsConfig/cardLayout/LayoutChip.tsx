import { CardLayoutItem } from '../types';
import { GroupColorClass } from './groupColors';

interface LayoutChipProps {
    item: CardLayoutItem;
    index: number;
    isFirstBlock: boolean;
    isLastBlock: boolean;
    colorClass: GroupColorClass;
    onMoveBlock: (direction: 'left' | 'right') => void;
    onRemove: () => void;
}

export function LayoutChip({
    item,
    index,
    isFirstBlock,
    isLastBlock,
    colorClass,
    onMoveBlock,
    onRemove,
}: LayoutChipProps) {
    return (
        <div className={`clc-chip clc-chip-group ${colorClass}`}>
            <span className="clc-chip-index">{index + 1}</span>

            <span>{item.label}</span>

            <div className="clc-chip-actions">
                <button
                    onClick={() => onMoveBlock('left')}
                    disabled={isFirstBlock}
                    className="clc-chip-btn"
                >
                    <svg
                        className="clc-icon-sm"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </button>

                <button
                    onClick={() => onMoveBlock('right')}
                    disabled={isLastBlock}
                    className="clc-chip-btn"
                >
                    <svg
                        className="clc-icon-sm"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </button>
            </div>

            <button
                onClick={onRemove}
                className="clc-chip-btn clc-chip-remove"
                title="Remove"
            >
                <svg
                    className="clc-icon-sm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
}
