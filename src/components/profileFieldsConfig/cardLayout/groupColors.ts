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
export function groupColorClass(groupId: number): GroupColorClass {
    const idx = (groupId - 1) % GROUP_COLOR_CLASSES.length;
    return GROUP_COLOR_CLASSES[idx];
}
