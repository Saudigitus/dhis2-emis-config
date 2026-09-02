import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import styles from './profileConfig.module.css';
import {
    IdentityBadge,
    IdentityCardConfig,
    ProfileComponentConfig,
    ProfileComponentType,
    ProfileTabConfig,
    VariableOption,
} from './types';

export type DialogTarget =
    | { kind: 'identity'; section: 'photo' | 'title' | 'subtitle' | 'badges' }
    | { kind: 'tab'; tab: ProfileTabConfig; isNew?: boolean }
    | { kind: 'component'; component: ProfileComponentConfig; isNew?: boolean };

type Props = {
    i18n: D2I18n;
    target: DialogTarget;
    identityCard: IdentityCardConfig;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    programStages: Array<{ id: string; label: string }>;
    onClose: () => void;
    onSaveIdentity: (value: IdentityCardConfig) => void;
    onSaveTab: (value: ProfileTabConfig) => void;
    onSaveComponent: (value: ProfileComponentConfig) => void;
    onDelete?: () => void;
};

const selectedValues = (event: React.ChangeEvent<HTMLSelectElement>) =>
    Array.from(event.target.selectedOptions).map(option => option.value);

const IdentityFields = ({
    section,
    value,
    attributes,
    dataElements,
    onChange,
    i18n,
}: {
    section: 'photo' | 'title' | 'subtitle' | 'badges';
    value: IdentityCardConfig;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    onChange: (value: IdentityCardConfig) => void;
    i18n: D2I18n;
}) => {
    const textValue = section === 'title' || section === 'subtitle' ? value[section] : undefined;
    const badgeVariables = [...attributes, ...dataElements];

    if (section === 'photo') {
        return (
            <label className={styles.field}>
                {i18n.t('Photo attribute')}
                <select
                    className={styles.select}
                    value={value.photo.attribute}
                    onChange={event => onChange({ ...value, photo: { attribute: event.target.value } })}
                >
                    <option value="">{i18n.t('No photo')}</option>
                    {attributes.filter(option => option.valueType === 'IMAGE').map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                </select>
                {!attributes.some(option => option.valueType === 'IMAGE') && (
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
                        {attributes.map(option => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
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
                        const previous = new Map(value.badges.map(badge => [
                            `${badge.source}:${badge.variable ?? ''}`,
                            badge,
                        ]));
                        const badges: IdentityBadge[] = selectedValues(event).map((item, order) => {
                            const [source, ...idParts] = item.split(':');
                            const variable = idParts.join(':');
                            const existing = previous.get(item);
                            return {
                                order,
                                source: source as IdentityBadge['source'],
                                variable,
                                styled: existing?.styled ?? true,
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
            {badgeVariables.length === 0 && (
                <span className={styles.fieldHint}>{i18n.t('No variables are available for this program.')}</span>
            )}
        </>
    );
};

export default function ConfigurationDialog({
    i18n,
    target,
    identityCard,
    attributes,
    dataElements,
    programStages,
    onClose,
    onSaveIdentity,
    onSaveTab,
    onSaveComponent,
    onDelete,
}: Props) {
    const [identityDraft, setIdentityDraft] = useState(identityCard);
    const [tabDraft, setTabDraft] = useState<ProfileTabConfig | null>(target.kind === 'tab' ? target.tab : null);
    const [componentDraft, setComponentDraft] = useState<ProfileComponentConfig | null>(target.kind === 'component' ? target.component : null);
    const [error, setError] = useState('');

    useEffect(() => {
        setIdentityDraft(identityCard);
        setTabDraft(target.kind === 'tab' ? target.tab : null);
        setComponentDraft(target.kind === 'component' ? target.component : null);
        setError('');
    }, [target, identityCard]);

    const title = useMemo(() => {
        if (target.kind === 'tab') return target.isNew ? i18n.t('Add section') : i18n.t('Configure section');
        if (target.kind === 'component') return target.isNew ? i18n.t('Add component') : i18n.t('Configure component');
        const titles = {
            photo: i18n.t('Configure photo'),
            title: i18n.t('Configure title'),
            subtitle: i18n.t('Configure subtitle'),
            badges: i18n.t('Configure badges'),
        };
        return titles[target.section];
    }, [i18n, target]);

    const save = () => {
        if (target.kind === 'identity') {
            onSaveIdentity(identityDraft);
            return;
        }
        if (target.kind === 'tab' && tabDraft) {
            if (!tabDraft.displayName.trim()) {
                setError(i18n.t('The section name is required.'));
                return;
            }
            onSaveTab({ ...tabDraft, displayName: tabDraft.displayName.trim() });
            return;
        }
        if (target.kind === 'component' && componentDraft) {
            if (!componentDraft.displayName.trim()) {
                setError(i18n.t('The component name is required.'));
                return;
            }
            if (componentDraft.type !== 'TEI_FORM' && !componentDraft.details?.programStage) {
                setError(i18n.t('Select a program stage.'));
                return;
            }
            onSaveComponent({ ...componentDraft, displayName: componentDraft.displayName.trim() });
        }
    };

    const updateComponentType = (type: ProfileComponentType) => {
        if (!componentDraft) return;
        setComponentDraft({
            ...componentDraft,
            type,
            details: type === 'TEI_FORM'
                ? undefined
                : componentDraft.details ?? { pageSize: 5, programStage: '' },
        });
    };

    return (
        <Modal onClose={onClose} position="middle" large>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>
                <div className={styles.dialogForm}>
                    {target.kind === 'identity' && (
                        <IdentityFields
                            section={target.section}
                            value={identityDraft}
                            attributes={attributes}
                            dataElements={dataElements}
                            onChange={setIdentityDraft}
                            i18n={i18n}
                        />
                    )}

                    {target.kind === 'tab' && tabDraft && (
                        <div className={styles.fieldGrid}>
                            <label className={styles.field}>
                                {i18n.t('Section name')}
                                <input
                                    className={styles.input}
                                    autoFocus
                                    value={tabDraft.displayName}
                                    onChange={event => setTabDraft({ ...tabDraft, displayName: event.target.value })}
                                />
                            </label>
                            <label className={styles.field}>
                                {i18n.t('Accent color')}
                                <input
                                    className={styles.input}
                                    type="color"
                                    value={tabDraft.color || '#147CD7'}
                                    onChange={event => setTabDraft({ ...tabDraft, color: event.target.value })}
                                />
                            </label>
                        </div>
                    )}

                    {target.kind === 'component' && componentDraft && (
                        <>
                            <label className={styles.field}>
                                {i18n.t('Component name')}
                                <input
                                    className={styles.input}
                                    autoFocus
                                    value={componentDraft.displayName}
                                    onChange={event => setComponentDraft({ ...componentDraft, displayName: event.target.value })}
                                />
                            </label>
                            <div className={styles.fieldGrid}>
                                <label className={styles.field}>
                                    {i18n.t('Display type')}
                                    <select
                                        className={styles.select}
                                        value={componentDraft.type}
                                        onChange={event => updateComponentType(event.target.value as ProfileComponentType)}
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
                                        value={componentDraft.size}
                                        onChange={event => setComponentDraft({ ...componentDraft, size: event.target.value })}
                                    >
                                        <option value="HALF">{i18n.t('Half width')}</option>
                                        <option value="FULL">{i18n.t('Full width')}</option>
                                    </select>
                                </label>
                            </div>
                            {componentDraft.type !== 'TEI_FORM' && (
                                <div className={styles.fieldGrid}>
                                    <label className={styles.field}>
                                        {i18n.t('Program stage')}
                                        <select
                                            className={styles.select}
                                            value={componentDraft.details?.programStage ?? ''}
                                            onChange={event => setComponentDraft({
                                                ...componentDraft,
                                                details: {
                                                    pageSize: componentDraft.details?.pageSize ?? 5,
                                                    programStage: event.target.value,
                                                },
                                            })}
                                        >
                                            <option value="">{i18n.t('Select a program stage')}</option>
                                            {programStages.map(stage => (
                                                <option key={stage.id} value={stage.id}>{stage.label}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className={styles.field}>
                                        {i18n.t('Items per page')}
                                        <input
                                            className={styles.input}
                                            type="number"
                                            min={1}
                                            max={100}
                                            value={componentDraft.details?.pageSize ?? 5}
                                            onChange={event => setComponentDraft({
                                                ...componentDraft,
                                                details: {
                                                    programStage: componentDraft.details?.programStage ?? '',
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
                                    checked={componentDraft.editable}
                                    onChange={event => setComponentDraft({ ...componentDraft, editable: event.target.checked })}
                                />
                                {i18n.t('Allow editing from the profile')}
                            </label>
                        </>
                    )}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </ModalContent>
            <ModalActions>
                <div className={styles.dialogActions}>
                    {onDelete && !(target.kind !== 'identity' && target.isNew) && (
                        <Button destructive onClick={onDelete}>{i18n.t('Delete')}</Button>
                    )}
                    <ButtonStrip end className={styles.dialogActionsRight}>
                        <Button secondary onClick={onClose}>{i18n.t('Cancel')}</Button>
                        <Button primary onClick={save}>{i18n.t('Apply')}</Button>
                    </ButtonStrip>
                </div>
            </ModalActions>
        </Modal>
    );
}
