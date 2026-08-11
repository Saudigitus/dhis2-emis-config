interface CreateGroupModalProps {
    value: string;
    onChange: (value: string) => void;
    onCreate: () => void;
    onClose: () => void;
}

export function CreateGroupModal({
    value,
    onChange,
    onCreate,
    onClose,
}: CreateGroupModalProps) {
    return (
        <div className="clc-modal-overlay">
            <div className="clc-modal">
                <h3 className="clc-modal-title">New group name</h3>

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g. Family, Academic, ID…"
                    className="clc-modal-input"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onCreate();
                        }

                        if (e.key === 'Escape') {
                            onClose();
                        }
                    }}
                />

                <div className="clc-modal-actions">
                    <button
                        onClick={onClose}
                        className="clc-btn clc-btn-secondary clc-btn-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onCreate}
                        disabled={!value.trim()}
                        className="clc-btn clc-btn-primary clc-btn-sm"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
