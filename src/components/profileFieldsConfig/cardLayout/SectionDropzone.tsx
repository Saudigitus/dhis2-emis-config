import { CardLayoutItem } from '../types';
import { LayoutBlock } from './LayoutBlock';
import { GroupBlock } from './buildBlocks';

interface SectionDropzoneProps {
    hasGroup: boolean;
    count: number;
    max: number;
    blocks: GroupBlock[];
    sectionItems: CardLayoutItem[];
    onMoveBlock: (blockIdx: number, direction: 'left' | 'right') => void;
    onMoveItem: (
        blockIdx: number,
        itemIdx: number,
        direction: 'up' | 'down'
    ) => void;
    onRemoveItem: (fieldKey: string) => void;
}

export function SectionDropzone({
    hasGroup,
    count,
    max,
    blocks,
    sectionItems,
    onMoveBlock,
    onMoveItem,
    onRemoveItem,
}: SectionDropzoneProps) {
    if (count === 0) {
        return (
            <div className="clc-dropzone">
                <div className="clc-empty">
                    <div className="clc-empty-subtitle">
                        {!hasGroup
                            ? 'Create or select a group before adding attributes.'
                            : `Choose an attribute above. Max ${max}.`}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="clc-dropzone">
            <div className="clc-blocks">
                {blocks.map((block, blockIdx) => (
                    <LayoutBlock
                        key={`${block.groupId}-${blockIdx}`}
                        block={block}
                        blockIdx={blockIdx}
                        totalBlocks={blocks.length}
                        sectionItems={sectionItems}
                        onMoveBlock={onMoveBlock}
                        onMoveItem={onMoveItem}
                        onRemoveItem={onRemoveItem}
                    />
                ))}
            </div>
        </div>
    );
}
