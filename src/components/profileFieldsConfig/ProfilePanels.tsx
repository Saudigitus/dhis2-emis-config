import { useState } from 'react';

import './ProfilePanels.css';
import { formatFieldValue, isNotRecorded } from './format';
import { ProfileFieldRow, GroupData } from './types';
import { EditStudentModal } from './EditStudentModal';

interface ProfilePanelsProps {
    identityFields: ProfileFieldRow[];
    groupedProfileFields: Record<number, GroupData>;
    studentData: Record<string, unknown>;
    studentId: number;
}

const colorClasses: Record<string, string> = {
    blue: 'pp-blue',
    slate: 'pp-slate',
    green: 'pp-green',
    red: 'pp-red',
    purple: 'pp-purple',
    amber: 'pp-amber',
    orange: 'pp-orange',
    teal: 'pp-teal',
};

export function ProfilePanels({
    identityFields,
    groupedProfileFields,
    studentData,
    studentId,
}: ProfilePanelsProps) {
    const [editGroup, setEditGroup] = useState<{ groupName: string; fields: ProfileFieldRow[] } | null>(null);
    const [localData, setLocalData] = useState(studentData);

    const identityColorClass = colorClasses['slate'] || colorClasses['blue'];

    const profileGroupEntries = Object.entries(groupedProfileFields).sort(
        ([, a], [, b]) => a.groupSortOrder - b.groupSortOrder
    );

    function handleSaved(updatedData: Record<string, unknown>) {
        setLocalData({ ...localData, ...updatedData });
        setEditGroup(null);
    }

    return (
        <>
            <div className="pp-grid">
                {/* Identity Panel */}
                <div className={`pp-panel ${identityColorClass}`}>
                    <div className="pp-panel-header">
                        <h2 className={`pp-panel-title ${identityColorClass}`}>Identity</h2>
                        <span className="pp-panel-tag">
                            Identity Card
                        </span>
                    </div>
                    <div className="pp-panel-body">
                        {identityFields.map((field) => {
                            const val = localData[field.fieldKey];
                            const notRecorded = isNotRecorded(val);
                            return (
                                <div
                                    key={field.id}
                                    className="pp-field-row"
                                >
                                    <span className="pp-field-label">{field.label}</span>
                                    <span
                                        className={`pp-field-value ${notRecorded ? 'pp-field-value-muted' : ''}`}
                                    >
                                        {formatFieldValue(val, field.fieldType, field.fieldKey)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Profile Form Panels */}
                {profileGroupEntries.map(([groupId, group]) => {
                    const colorClass = colorClasses[group.groupColor] || colorClasses['blue'];
                    return (
                        <div
                            key={groupId}
                            className={`pp-panel ${colorClass}`}
                        >
                            <div className="pp-panel-header">
                                <h2 className={`pp-panel-title ${colorClass}`}>
                                    {group.groupName}
                                </h2>
                                <div className="pp-panel-header-actions">
                                    <span className="pp-panel-tag">
                                        Profile Form
                                    </span>
                                    <button
                                        onClick={() => setEditGroup({ groupName: group.groupName, fields: group.fields })}
                                        className="pp-edit-btn"
                                    >
                                        <svg className="pp-edit-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <div className="pp-panel-body">
                                {group.fields.map((field) => {
                                    const val = localData[field.fieldKey];
                                    const notRecorded = isNotRecorded(val);
                                    return (
                                        <div
                                            key={field.id}
                                            className="pp-field-row"
                                        >
                                            <span className="pp-field-label">{field.label}</span>
                                            <span
                                                className={`pp-field-value ${notRecorded ? 'pp-field-value-muted' : ''}`}
                                            >
                                                {formatFieldValue(val, field.fieldType, field.fieldKey)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edit Modal */}
            {editGroup && (
                <EditStudentModal
                    studentId={studentId}
                    groupName={editGroup.groupName}
                    fields={editGroup.fields}
                    currentData={localData}
                    onClose={() => setEditGroup(null)}
                    onSaved={handleSaved}
                />
            )}
        </>
    );
}
