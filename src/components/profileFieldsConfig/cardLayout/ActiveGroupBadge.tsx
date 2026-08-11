import { groupColorClass, GroupColorClass } from './groupColors';

interface ActiveGroupBadgeProps {
    name: string;
    groupId: number;
    colorClass?: GroupColorClass;
}

export function ActiveGroupBadge({
    name,
    groupId,
    colorClass,
}: ActiveGroupBadgeProps) {
    const resolvedColor =
        colorClass ?? groupColorClass(groupId);

    return (
        <span className={`clc-group-badge ${resolvedColor}`}>
            <svg
                className="clc-icon-xs"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.861-2.578a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.217 8.688"
                />
            </svg>

            {name}
        </span>
    );
}
