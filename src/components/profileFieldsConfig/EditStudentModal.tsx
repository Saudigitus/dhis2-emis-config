import { useState } from 'react';

import './EditStudentModal.css';
import { ProfileFieldRow } from './types';

interface EditStudentModalProps {
    studentId: number;
    groupName: string;
    fields: ProfileFieldRow[];
    currentData: Record<string, unknown>;
    onClose: () => void;
    onSaved: (data: Record<string, unknown>) => void;
}

export function EditStudentModal({
    studentId,
    groupName,
    fields,
    currentData,
    onClose,
    onSaved,
}: EditStudentModalProps) {
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {};
        for (const f of fields) {
            const v = currentData[f.fieldKey];
            init[f.fieldKey] = v === null || v === undefined ? '' : String(v);
        }
        return init;
    });
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const body: Record<string, unknown> = {};
        for (const f of fields) {
            const raw = formData[f.fieldKey];
            if (f.fieldType === 'number') {
                body[f.fieldKey] = raw === '' ? null : Number(raw);
            } else {
                body[f.fieldKey] = raw;
            }
        }

        const res = await fetch(`/api/students/${studentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            onSaved(body);
        }
        setSaving(false);
    }

    return (
        <div className="esm-overlay">
            <div className="esm-modal">
                <div className="esm-header">
                    <h3 className="esm-title">
                        Edit {groupName}
                    </h3>
                    <button
                        onClick={onClose}
                        className="esm-close"
                    >
                        <svg className="esm-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="esm-form">
                    {fields.map((field) => (
                        <div key={field.id} className="esm-field">
                            <label className="esm-label">
                                {field.label}
                            </label>
                            {field.fieldType === 'select' && field.options ? (
                                <select
                                    value={formData[field.fieldKey] || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                    }
                                    className="esm-input"
                                >
                                    <option value="">-- Select --</option>
                                    {field.options.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : field.fieldType === 'date' ? (
                                <input
                                    type="date"
                                    value={formData[field.fieldKey] || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                    }
                                    className="esm-input"
                                />
                            ) : field.fieldType === 'number' ? (
                                <input
                                    type="number"
                                    step="any"
                                    value={formData[field.fieldKey] || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                    }
                                    className="esm-input"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={formData[field.fieldKey] || ''}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                    }
                                    className="esm-input"
                                />
                            )}
                        </div>
                    ))}

                    <div className="esm-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="esm-btn esm-btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="esm-btn esm-btn-primary"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
