import { CardLayoutItem } from '../types';
import { GroupColorClass } from './groupColors';

interface LayoutChipProps {
    item: CardLayoutItem;
    index: number;
    isFirstInGroup: boolean;
    isLastInGroup: boolean;
    colorClass: GroupColorClass;
    onMoveItem: (direction: 'up' | 'down') => void;
    onRemove: () => void;
}

export function LayoutChip({
    item,
    index,
    isFirstInGroup,
    isLastInGroup,
    colorClass,
    onMoveItem,
    onRemove,
}: LayoutChipProps) {
    return (
        <div className={`clc-chip clc-chip-group ${colorClass}`}>
            <span className="clc-chip-index">{index + 1}</span>

            <span>{item.label}</span>

            <div className="clc-chip-actions">
                <button
                    onClick={() => onMoveItem('up')}
                    disabled={isFirstInGroup}
                    className="clc-chip-btn"
                    title="Move field up in group"
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
                            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                        />
                    </svg>
                </button>

                <button
                    onClick={() => onMoveItem('down')}
                    disabled={isLastInGroup}
                    className="clc-chip-btn"
                    title="Move field down in group"
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
                            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
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
