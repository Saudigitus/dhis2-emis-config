import { useState } from 'react';

import './StudentEditForm.css';
import { ProfileFieldRow } from './types';

interface Props {
    studentId: number;
    fields: ProfileFieldRow[];
    studentData: Record<string, unknown>;
    onSaved?: () => void;
    onCancel?: () => void;
}

export function StudentEditForm({ studentId, fields, studentData, onSaved, onCancel }: Props) {
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {};
        for (const f of fields) {
            const v = studentData[f.fieldKey];
            init[f.fieldKey] = v === null || v === undefined ? '' : String(v);
        }
        return init;
    });
    const [saving, setSaving] = useState(false);

    // Group fields by group
    const grouped = fields.reduce<Record<number, { groupName: string; groupColor: string; fields: ProfileFieldRow[] }>>(
        (acc, f) => {
            if (!acc[f.groupId]) {
                acc[f.groupId] = { groupName: f.groupName, groupColor: f.groupColor, fields: [] };
            }
            acc[f.groupId].fields.push(f);
            return acc;
        },
        {}
    );

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
            onSaved?.();
        }
        setSaving(false);
    }

    return (
        <form onSubmit={handleSubmit} className="sef-form">
            {Object.entries(grouped).map(([groupId, group]) => (
                <div key={groupId} className="sef-group">
                    <h3 className="sef-group-title">
                        {group.groupName}
                    </h3>
                    <div className="sef-grid">
                        {group.fields.map((field) => (
                            <div key={field.id} className="sef-field">
                                <label className="sef-label">
                                    {field.label}
                                </label>
                                {field.fieldType === 'select' && field.options ? (
                                    <select
                                        value={formData[field.fieldKey] || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                        }
                                        className="sef-input"
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
                                        className="sef-input"
                                    />
                                ) : field.fieldType === 'number' ? (
                                    <input
                                        type="number"
                                        step="any"
                                        value={formData[field.fieldKey] || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                        }
                                        className="sef-input"
                                    />
                                ) : field.fieldType === 'textarea' ? (
                                    <textarea
                                        value={formData[field.fieldKey] || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                        }
                                        rows={3}
                                        className="sef-input"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={formData[field.fieldKey] || ''}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.fieldKey]: e.target.value })
                                        }
                                        className="sef-input"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="sef-actions">
                <button
                    type="button"
                    onClick={onCancel}
                    className="sef-btn sef-btn-secondary"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="sef-btn sef-btn-primary"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
