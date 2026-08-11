import { GroupDef, CardLayoutItem } from '../types';
import { SectionConfig } from './constants';
import { SectionHeader } from './SectionHeader';
import { SectionDropzone } from './SectionDropzone';
import { GroupBlock } from './buildBlocks';

interface LayoutSectionProps {
    section: SectionConfig;
    sectionItems: CardLayoutItem[];
    blocks: GroupBlock[];
    groups: GroupDef[];
    selectedGroupId: string | undefined;
    activeGroupName: string | null;
    canAdd: boolean;
    hasGroup: boolean;
    available: { key: string; label: string }[];
    showDivider: boolean;
    onAddItem: (key: string) => void;
    onSelectGroup: (groupId: string) => void;
    onCreateGroup: () => void;
    onMoveBlock: (blockIdx: number, direction: 'left' | 'right') => void;
    onMoveItem: (
        blockIdx: number,
        itemIdx: number,
        direction: 'up' | 'down'
    ) => void;
    onRemoveItem: (fieldKey: string) => void;
}

export function LayoutSection({
    section,
    sectionItems,
    blocks,
    groups,
    selectedGroupId,
    activeGroupName,
    canAdd,
    hasGroup,
    available,
    showDivider,
    onAddItem,
    onSelectGroup,
    onCreateGroup,
    onMoveBlock,
    onMoveItem,
    onRemoveItem,
}: LayoutSectionProps) {
    return (
        <div className="clc-section">
            <SectionHeader
                section={section}
                groups={groups}
                selectedGroupId={selectedGroupId}
                activeGroupName={activeGroupName}
                canAdd={canAdd}
                hasGroup={hasGroup}
                available={available}
                onAddItem={onAddItem}
                onSelectGroup={onSelectGroup}
                onCreateGroup={onCreateGroup}
            />

            <SectionDropzone
                hasGroup={hasGroup}
                count={sectionItems.length}
                max={section.max}
                blocks={blocks}
                sectionItems={sectionItems}
                onMoveBlock={onMoveBlock}
                onMoveItem={onMoveItem}
                onRemoveItem={onRemoveItem}
            />

            {showDivider && <div className="clc-divider" />}
        </div>
    );
}
