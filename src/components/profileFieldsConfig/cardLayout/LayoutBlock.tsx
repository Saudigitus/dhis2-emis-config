import { CardLayoutItem } from '../types';
import { LayoutChip } from './LayoutChip';
import { GroupBlock } from './buildBlocks';
import { groupColorClass } from './groupColors';

interface LayoutBlockProps {
    block: GroupBlock;
    blockIdx: number;
    totalBlocks: number;
    sectionItems: CardLayoutItem[];
    onMoveBlock: (blockIdx: number, direction: 'left' | 'right') => void;
    onMoveItem: (
        blockIdx: number,
        itemIdx: number,
        direction: 'up' | 'down'
    ) => void;
    onRemoveItem: (fieldKey: string) => void;
}

export function LayoutBlock({
    block,
    blockIdx,
    totalBlocks,
    sectionItems,
    onMoveBlock,
    onMoveItem,
    onRemoveItem,
}: LayoutBlockProps) {
    const colorClass = groupColorClass(block.groupId);

    return (
        <div
            key={`${block.groupId}-${blockIdx}`}
            className="clc-block"
        >
            <div className="clc-block-head">
                <span className={`clc-block-group-tag ${colorClass}`}>
                    {block.groupName}
                </span>

                <div className="clc-block-actions">
                    <button
                        onClick={() => onMoveBlock(blockIdx, 'left')}
                        disabled={blockIdx === 0}
                        className="clc-chip-btn"
                        title="Move group left"
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
                        onClick={() => onMoveBlock(blockIdx, 'right')}
                        disabled={blockIdx === totalBlocks - 1}
                        className="clc-chip-btn"
                        title="Move group right"
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
            </div>

            {block.items.map((item, itemIdx) => {
                const globalIdx = sectionItems.findIndex(
                    (x) => x.id === item.id
                );

                return (
                    <LayoutChip
                        key={item.fieldKey}
                        item={item}
                        index={globalIdx}
                        isFirstInGroup={itemIdx === 0}
                        isLastInGroup={itemIdx === block.items.length - 1}
                        colorClass={colorClass}
                        onMoveItem={(direction) =>
                            onMoveItem(blockIdx, itemIdx, direction)
                        }
                        onRemove={() => onRemoveItem(item.fieldKey)}
                    />
                );
            })}
        </div>
    );
}
