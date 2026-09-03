import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { ProfileSummaryCard, VariableOption } from '../types';

type Props = {
    i18n: D2I18n;
    value: ProfileSummaryCard;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    onChange: (value: ProfileSummaryCard) => void;
};

export default function SummaryCardFields({ i18n, value, attributes, dataElements, onChange }: Props) {
    return (
        <>
            <label className={styles.field}>
                {i18n.t('Variable')}
                <select
                    className={styles.select}
                    autoFocus
                    value={value?.variable ? `${value?.source}:${value?.variable}` : ''}
                    onChange={event => {
                        const [source, ...variableParts] = event.target.value.split(':');
                        onChange({
                            ...value,
                            source: (source || 'ATTRIBUTE') as ProfileSummaryCard['source'],
                            variable: variableParts.join(':'),
                        });
                    }}
                >
                    <option value="">{i18n.t('Select a variable')}</option>
                    <optgroup label={i18n.t('Attributes')}>
                        {attributes?.map(option => (
                            <option key={`ATTRIBUTE:${option?.id}`} value={`ATTRIBUTE:${option?.id}`}>{option?.label}</option>
                        ))}
                    </optgroup>
                    <optgroup label={i18n.t('Data elements')}>
                        {dataElements?.map(option => (
                            <option key={`DATA_ELEMENTS:${option?.id}`} value={`DATA_ELEMENTS:${option?.id}`}>{option?.label}</option>
                        ))}
                    </optgroup>
                </select>
            </label>
            <label className={styles.field}>
                {i18n.t('Card name')} <span className={styles.optionalLabel}>({i18n.t('optional')})</span>
                <input
                    className={styles.input}
                    value={value?.displayName ?? ''}
                    placeholder={i18n.t('Uses the variable name when empty')}
                    onChange={event => onChange({ ...value, displayName: event.target.value })}
                />
                <span className={styles.fieldHint}>
                    {i18n.t('Leave this field empty to use the selected variable name.')}
                </span>
            </label>
        </>
    );
}
