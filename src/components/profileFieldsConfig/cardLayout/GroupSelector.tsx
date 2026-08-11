import { GroupDef } from '../types';

interface GroupSelectorProps {
    groups: GroupDef[];
    selectedGroupId: number | undefined;
    onSelect: (groupId: number) => void;
    onCreate: () => void;
}

export function GroupSelector({
    groups,
    selectedGroupId,
    onSelect,
    onCreate,
}: GroupSelectorProps) {
    return (
        <div className="clc-group-toggle">
            <span className="clc-group-toggle-label">Group:</span>

            <div className="clc-group-select-wrap">
                <select
                    value={
                        selectedGroupId !== undefined
                            ? `gid:${selectedGroupId}`
                            : ''
                    }
                    onChange={(e) => {
                        const value = e.target.value;

                        if (value === 'new') {
                            onCreate();
                            return;
                        }

                        if (value.startsWith('gid:')) {
                            onSelect(parseInt(value.split(':')[1], 10));
                        }
                    }}
                    className="clc-group-select"
                >
                    <option value="">Select group…</option>
                    <option value="new">+ Create new…</option>

                    {groups.map((g) => (
                        <option key={g.id} value={`gid:${g.id}`}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <span className="clc-group-select-chevron">
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
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
}
