import { CardLayoutItem, Block } from '../types';

export type GroupBlock = Extract<Block, { type: 'group' }>;

/**
 * Builds contiguous blocks from the sorted items of a section.
 * All items must belong to a group; items of the same group
 * that are adjacent are merged into a single block.
 */
export function buildBlocks(sectionItems: CardLayoutItem[]): GroupBlock[] {
    const blocks: GroupBlock[] = [];

    for (const item of sectionItems) {
        // All items must belong to a group.
        if (item.groupId === null || item.groupId === undefined) {
            continue;
        }

        const last = blocks[blocks.length - 1];

        if (last && last.type === 'group' && last.groupId === item.groupId) {
            last.items.push(item);
        } else {
            blocks.push({
                type: 'group',
                groupId: item.groupId,
                groupName: item.groupName || `G${item.groupId}`,
                items: [item],
            });
        }
    }

    return blocks;
}
