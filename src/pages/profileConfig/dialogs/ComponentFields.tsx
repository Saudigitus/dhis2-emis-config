import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { ProfileComponentConfig, ProfileComponentType } from '../types';

type Props = {
    i18n: D2I18n;
    value: ProfileComponentConfig;
    programStages: Array<{ id: string; label: string }>;
    onChange: (value: ProfileComponentConfig) => void;
};

export default function ComponentFields({ i18n, value, programStages, onChange }: Props) {
    const isEventComponent = value?.type === 'EVENT_TABLE' || value?.type === 'EVENT_CARDS';
    const updateType = (type: ProfileComponentType) => onChange({
        ...value,
        type,
        details: type === 'TEI_FORM' ? undefined : value?.details ?? { pageSize: 5, programStage: '' },
    });

    return (
        <>
            <label className={styles.field}>
                {i18n.t('Component name')}
                <input
                    className={styles.input}
                    autoFocus
                    value={value?.displayName ?? ''}
                    onChange={event => onChange({ ...value, displayName: event.target.value })}
                />
            </label>
            <div className={styles.fieldGrid}>
                <label className={styles.field}>
                    {i18n.t('Display type')}
                    <select
                        className={styles.select}
                        value={value?.type ?? ''}
                        onChange={event => updateType(event.target.value as ProfileComponentType)}
                    >
                        <option value="TEI_FORM">{i18n.t('Personal details')}</option>
                        <option value="EVENT_CARDS">{i18n.t('Event cards')}</option>
                        <option value="EVENT_TABLE">{i18n.t('Event table')}</option>
                    </select>
                </label>
                <label className={styles.field}>
                    {i18n.t('Width')}
                    <select
                        className={styles.select}
                        value={value?.size ?? ''}
                        onChange={event => onChange({ ...value, size: event.target.value })}
                    >
                        <option value="HALF">{i18n.t('Half width')}</option>
                        <option value="FULL">{i18n.t('Full width')}</option>
                    </select>
                </label>
            </div>
            {isEventComponent && (
                <div className={styles.fieldGrid}>
                    <label className={styles.field}>
                        {i18n.t('Program stage')}
                        <select
                            className={styles.select}
                            value={value.details?.programStage ?? ''}
                            onChange={event => onChange({
                                ...value,
                                details: {
                                    pageSize: value?.details?.pageSize ?? 5,
                                    programStage: event.target.value,
                                },
                            })}
                        >
                            <option value="">{i18n.t('Select a program stage')}</option>
                            {programStages?.map(stage => <option key={stage?.id} value={stage?.id}>{stage?.label}</option>)}
                        </select>
                    </label>
                    <label className={styles.field}>
                        {i18n.t('Items per page')}
                        <input
                            className={styles.input}
                            type="number"
                            min={1}
                            max={100}
                            value={value.details?.pageSize ?? 5}
                            onChange={event => onChange({
                                ...value,
                                details: {
                                    programStage: value?.details?.programStage ?? '',
                                    pageSize: Math.max(1, Number(event.target.value) || 1),
                                },
                            })}
                        />
                    </label>
                </div>
            )}
            <label className={styles.checkboxField}>
                <input
                    type="checkbox"
                    checked={value?.editable ?? false}
                    onChange={event => onChange({ ...value, editable: event.target.checked })}
                />
                {i18n.t('Allow editing from the profile')}
            </label>
        </>
    );
}
