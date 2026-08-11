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
    onRemoveItem: (fieldKey: string) => void;
}

export function LayoutBlock({
    block,
    blockIdx,
    totalBlocks,
    sectionItems,
    onMoveBlock,
    onRemoveItem,
}: LayoutBlockProps) {
    const colorClass = groupColorClass(block.groupId);

    return (
        <div
            key={`${block.groupId}-${blockIdx}`}
            className="clc-block"
        >
            <span className={`clc-block-group-tag ${colorClass}`}>
                {block.groupName}
            </span>

            {block.items.map((item) => {
                const globalIdx = sectionItems.findIndex(
                    (x) => x.id === item.id
                );

                return (
                    <LayoutChip
                        key={item.fieldKey}
                        item={item}
                        index={globalIdx}
                        isFirstBlock={blockIdx === 0}
                        isLastBlock={blockIdx === totalBlocks - 1}
                        colorClass={colorClass}
                        onMoveBlock={(direction) =>
                            onMoveBlock(blockIdx, direction)
                        }
                        onRemove={() => onRemoveItem(item.fieldKey)}
                    />
                );
            })}
        </div>
    );
}
