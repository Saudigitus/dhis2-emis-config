import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { IdentityBadge, IdentityCardConfig, VariableOption } from '../types';

type Props = {
    i18n: D2I18n;
    section: 'photo' | 'title' | 'subtitle' | 'badges';
    value: IdentityCardConfig;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    onChange: (value: IdentityCardConfig) => void;
};

const selectedValues = (event: React.ChangeEvent<HTMLSelectElement>) =>
    Array.from(event.target.selectedOptions).map(option => option.value);

export default function IdentityFields({ i18n, section, value, attributes, dataElements, onChange }: Props) {
    const textValue = section === 'title' || section === 'subtitle' ? value[section] : undefined;

    if (section === 'photo') {
        const imageAttributes = attributes.filter(option => option.valueType === 'IMAGE');
        return (
            <label className={styles.field}>
                {i18n.t('Photo attribute')}
                <select
                    className={styles.select}
                    value={value.photo.attribute}
                    onChange={event => onChange({ ...value, photo: { attribute: event.target.value } })}
                >
                    <option value="">{i18n.t('No photo')}</option>
                    {imageAttributes.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
                </select>
                {imageAttributes.length === 0 && (
                    <span className={styles.fieldHint}>{i18n.t('This program has no image attributes.')}</span>
                )}
            </label>
        );
    }

    if (textValue) {
        return (
            <>
                <label className={styles.field}>
                    {i18n.t('Variables')}
                    <select
                        className={styles.select}
                        multiple
                        value={textValue.attributes}
                        onChange={event => onChange({
                            ...value,
                            [section]: { ...textValue, attributes: selectedValues(event) },
                        })}
                    >
                        {attributes.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                    <span className={styles.fieldHint}>{i18n.t('Use Ctrl/Cmd to select more than one variable.')}</span>
                </label>
                <label className={styles.field}>
                    {i18n.t('Separator')}
                    <input
                        className={styles.input}
                        value={textValue.separator}
                        maxLength={10}
                        onChange={event => onChange({
                            ...value,
                            [section]: { ...textValue, separator: event.target.value },
                        })}
                    />
                </label>
            </>
        );
    }

    const selectedBadges = value.badges.map(badge => `${badge.source}:${badge.variable ?? ''}`);
    return (
        <>
            <label className={styles.field}>
                {i18n.t('Badge variables')}
                <select
                    className={styles.select}
                    multiple
                    value={selectedBadges}
                    onChange={event => {
                        const previous = new Map(value.badges.map(badge => [`${badge.source}:${badge.variable ?? ''}`, badge]));
                        const badges: IdentityBadge[] = selectedValues(event).map((item, order) => {
                            const [source, ...idParts] = item.split(':');
                            return {
                                order,
                                source: source as IdentityBadge['source'],
                                variable: idParts.join(':'),
                                styled: previous.get(item)?.styled ?? true,
                            };
                        });
                        onChange({ ...value, badges });
                    }}
                >
                    <optgroup label={i18n.t('Attributes')}>
                        {attributes.map(option => (
                            <option key={`ATTRIBUTE:${option.id}`} value={`ATTRIBUTE:${option.id}`}>{option.label}</option>
                        ))}
                    </optgroup>
                    <optgroup label={i18n.t('Data elements')}>
                        {dataElements.map(option => (
                            <option key={`DATA_ELEMENTS:${option.id}`} value={`DATA_ELEMENTS:${option.id}`}>{option.label}</option>
                        ))}
                    </optgroup>
                </select>
                <span className={styles.fieldHint}>{i18n.t('Badges appear below the subtitle in the selected order.')}</span>
            </label>
            {value.badges.length > 0 && (
                <label className={styles.checkboxField}>
                    <input
                        type="checkbox"
                        checked={value.badges.every(badge => badge.styled)}
                        onChange={event => onChange({
                            ...value,
                            badges: value.badges.map(badge => ({ ...badge, styled: event.target.checked })),
                        })}
                    />
                    {i18n.t('Use option colors when available')}
                </label>
            )}
            {attributes.length + dataElements.length === 0 && (
                <span className={styles.fieldHint}>{i18n.t('No variables are available for this program.')}</span>
            )}
        </>
    );
}
