interface AvailableAttribute {
    key: string;
    label: string;
}

interface AttributeSelectProps {
    placeholder: string;
    available: AvailableAttribute[];
    disabled: boolean;
    hasGroup: boolean;
    onSelect: (key: string) => void;
}

export function AttributeSelect({
    placeholder,
    available,
    disabled,
    hasGroup,
    onSelect,
}: AttributeSelectProps) {
    return (
        <div className="clc-select-wrap">
            <select
                value=""
                onChange={(e) => {
                    if (e.target.value) {
                        onSelect(e.target.value);
                    }
                }}
                disabled={disabled}
                className="clc-select"
            >
                <option value="">
                    {!hasGroup
                        ? 'Select/create a group first…'
                        : placeholder}
                </option>

                {available.map((a) => (
                    <option key={a.key} value={a.key}>
                        {a.label}
                    </option>
                ))}
            </select>

            <span className="clc-select-chevron">
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
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </span>
        </div>
    );
}
