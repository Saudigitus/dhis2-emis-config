export const GROUP_COLOR_CLASSES = [
    'clc-group-emerald',
    'clc-group-blue',
    'clc-group-purple',
    'clc-group-amber',
    'clc-group-teal',
    'clc-group-rose',
    'clc-group-indigo',
    'clc-group-orange',
] as const;

export type GroupColorClass = (typeof GROUP_COLOR_CLASSES)[number];

/**
 * Assigns a color class to a group deterministically based on its id,
 * so each group always renders with the same color.
 */
export function groupColorClass(groupId: string): GroupColorClass {
    let hash = 0;

    for (let i = 0; i < groupId.length; i++) {
        hash = (hash * 31 + groupId.charCodeAt(i)) >>> 0;
    }

    return GROUP_COLOR_CLASSES[hash % GROUP_COLOR_CLASSES.length];
}
