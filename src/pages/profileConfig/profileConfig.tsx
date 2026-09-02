import React, { useEffect, useMemo, useState } from 'react';
import { Button, ButtonStrip } from '@dhis2/ui';
import { Add as AddIcon, ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { DataStoreState, WithPadding } from 'dhis2-semis-components';
import { D2I18n } from 'dhis2-semis-types';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useGetSelectedKeys from '../../../../../libs/components/src/hooks/config/useGetSelectedKeys';
import useGetDataStore from '../../hooks/dataStore/useGetDataStore';
import usePostDataStore from '../../hooks/dataStore/usePostDataStore';
import useShowAlerts from '../../hooks/alert/useShowAlert';
import ConfigurationDialog, { DialogTarget } from './ConfigurationDialog';
import IdDetails from './idDetails/idDetails';
import styles from './profileConfig.module.css';
import {
    createProfileComponent,
    createProfileTab,
    emptyIdentityCard,
    ProfileComponentConfig,
    ProfileConfig,
    ProfileTabConfig,
    VariableOption,
} from './types';

const normalizeProfile = (profile: Partial<ProfileConfig> | undefined, programId = ''): ProfileConfig => ({
    identityCard: {
        ...emptyIdentityCard(),
        ...(profile?.identityCard ?? {}),
        photo: { ...emptyIdentityCard().photo, ...(profile?.identityCard?.photo ?? {}) },
        title: { ...emptyIdentityCard().title, ...(profile?.identityCard?.title ?? {}) },
        subtitle: { ...emptyIdentityCard().subtitle, ...(profile?.identityCard?.subtitle ?? {}) },
        badges: profile?.identityCard?.badges ?? [],
    },
    program: profile?.program ?? programId,
    tabs: (profile?.tabs ?? []).map((tab, tabIndex) => ({
        ...tab,
        order: tabIndex,
        components: (tab.components ?? []).map((component, componentIndex) => ({
            ...component,
            order: componentIndex,
        })),
    })),
});

const componentTypeLabel = (type: ProfileComponentConfig['type'], i18n: D2I18n) => ({
    TEI_FORM: i18n.t('Personal details'),
    EVENT_CARDS: i18n.t('Event cards'),
    EVENT_TABLE: i18n.t('Event table'),
}[type]);

export default function ProfileConfiguration({ i18n }: { i18n: D2I18n }) {
    const navigate = useNavigate();
    const { program, dataStoreData } = useGetSelectedKeys();
    const dataStore = useRecoilValue<any>(DataStoreState);
    const { createDataStore, loading: saving } = usePostDataStore();
    const { refetch } = useGetDataStore(true);
    const { show } = useShowAlerts();

    const sourceProfile = useMemo(
        () => normalizeProfile(dataStoreData?.profile, dataStoreData?.program ?? program?.id ?? ''),
        [dataStoreData?.profile, dataStoreData?.program, program?.id],
    );
    const [draft, setDraft] = useState<ProfileConfig>(sourceProfile);
    const [activeTabId, setActiveTabId] = useState(sourceProfile.tabs[0]?.id ?? '');
    const [dialogTarget, setDialogTarget] = useState<DialogTarget | null>(null);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setDraft(sourceProfile);
        setActiveTabId(current => sourceProfile.tabs.some(tab => tab.id === current)
            ? current
            : sourceProfile.tabs[0]?.id ?? '');
        setDirty(false);
    }, [sourceProfile]);

    const attributes: VariableOption[] = useMemo(() => (
        program?.programTrackedEntityAttributes ?? []
    ).map((item: any) => ({
        id: item.trackedEntityAttribute.id,
        label: item.trackedEntityAttribute.displayName ?? item.trackedEntityAttribute.name,
        source: 'ATTRIBUTE' as const,
        valueType: item.trackedEntityAttribute.valueType,
    })), [program]);

    const dataElements: VariableOption[] = useMemo(() => {
        const unique = new Map<string, VariableOption>();
        (program?.programStages ?? []).forEach((stage: any) => {
            (stage.programStageDataElements ?? []).forEach((item: any) => {
                const element = item.dataElement;
                if (element?.id && !unique.has(element.id)) {
                    unique.set(element.id, {
                        id: element.id,
                        label: element.displayName ?? element.name,
                        source: 'DATA_ELEMENTS',
                        valueType: element.valueType,
                    });
                }
            });
        });
        return Array.from(unique.values());
    }, [program]);

    const programStages = useMemo(() => (program?.programStages ?? []).map((stage: any) => ({
        id: stage.id,
        label: stage.displayName,
    })), [program]);

    const activeTab = draft.tabs.find(tab => tab.id === activeTabId);

    const updateDraft = (next: ProfileConfig) => {
        setDraft(next);
        setDirty(true);
    };

    const saveTab = (tab: ProfileTabConfig) => {
        const exists = draft.tabs.some(item => item.id === tab.id);
        updateDraft({
            ...draft,
            tabs: exists ? draft.tabs.map(item => item.id === tab.id ? tab : item) : [...draft.tabs, tab],
        });
        setActiveTabId(tab.id);
        setDialogTarget(null);
    };

    const saveComponent = (component: ProfileComponentConfig) => {
        if (!activeTab) return;
        const exists = activeTab.components.some(item => item.order === component.order);
        const components = exists
            ? activeTab.components.map(item => item.order === component.order ? component : item)
            : [...activeTab.components, component];
        updateDraft({
            ...draft,
            tabs: draft.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
        });
        setDialogTarget(null);
    };

    const deleteTarget = () => {
        if (!dialogTarget) return;
        if (dialogTarget.kind === 'tab') {
            const tabs = draft.tabs
                .filter(tab => tab.id !== dialogTarget.tab.id)
                .map((tab, order) => ({ ...tab, order }));
            updateDraft({ ...draft, tabs });
            setActiveTabId(tabs[0]?.id ?? '');
        } else if (dialogTarget.kind === 'component' && activeTab) {
            const components = activeTab.components
                .filter(component => component.order !== dialogTarget.component.order)
                .map((component, order) => ({ ...component, order }));
            updateDraft({
                ...draft,
                tabs: draft.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
            });
        }
        setDialogTarget(null);
    };

    const persist = async () => {
        const sectionKey = dataStoreData?.key;
        const sectionIndex = Array.isArray(dataStore)
            ? dataStore.findIndex((section: any) => section.key === sectionKey)
            : -1;

        if (sectionIndex < 0) {
            show({ message: i18n.t('Unable to identify the current configuration section.'), type: { critical: true } });
            return;
        }

        const nextDataStore = dataStore.map((section: any, index: number) => index === sectionIndex
            ? { ...section, profile: { ...draft, program: draft.program || section.program } }
            : section);

        try {
            await createDataStore({ data: nextDataStore, key: 'dataStore/semis/values' });
            await refetch();
            setDirty(false);
            show({ message: i18n.t('Profile configuration saved successfully.'), type: { success: true } });
        } catch (error: any) {
            show({
                message: `${i18n.t('Unable to save profile configuration')}: ${error?.message ?? ''}`,
                type: { critical: true },
            });
        }
    };

    return (
        <WithPadding p="24px">
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <div>
                        <h1>{i18n.t('Profile configuration')}</h1>
                        <p>{i18n.t('Click any highlighted area to choose its name, variables and presentation.')}</p>
                    </div>
                    <ButtonStrip>
                        <Button secondary icon={<ArrowBackIcon fontSize="small" />} onClick={() => navigate(-1)}>
                            {i18n.t('Back')}
                        </Button>
                        <Button primary loading={saving} disabled={!dirty || saving} onClick={persist}>
                            {i18n.t('Save configuration')}
                        </Button>
                    </ButtonStrip>
                </div>

                <IdDetails
                    i18n={i18n}
                    config={draft.identityCard}
                    attributes={attributes}
                    dataElements={dataElements}
                    onConfigure={section => setDialogTarget({ kind: 'identity', section })}
                />

                <section className={styles.workspace} aria-label={i18n.t('Profile sections')}>
                    <div className={styles.tabsRow}>
                        {draft.tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                className={`${styles.tab} ${tab.id === activeTabId ? styles.tabSelected : ''}`}
                                style={tab.id === activeTabId ? { borderBottomColor: tab.color } : undefined}
                                onClick={() => {
                                    if (tab.id === activeTabId) setDialogTarget({ kind: 'tab', tab });
                                    else setActiveTabId(tab.id);
                                }}
                                title={i18n.t('Select; click again to configure')}
                            >
                                {tab.displayName}
                                {tab.id === activeTabId && <EditIcon className={styles.tabEdit} sx={{ fontSize: 14 }} />}
                            </button>
                        ))}
                        <button
                            type="button"
                            className={styles.addTab}
                            onClick={() => setDialogTarget({ kind: 'tab', tab: createProfileTab(draft.tabs.length), isNew: true })}
                        >
                            + {i18n.t('Add section')}
                        </button>
                    </div>

                    <div className={styles.canvas}>
                        {activeTab ? (
                            <>
                                {activeTab.components.length > 0 ? (
                                    <div className={styles.componentGrid}>
                                        {activeTab.components.map(component => (
                                            <button
                                                type="button"
                                                key={`${activeTab.id}-${component.order}`}
                                                className={`${styles.componentCard} ${component.size === 'FULL' ? styles.componentFull : ''}`}
                                                onClick={() => setDialogTarget({ kind: 'component', component })}
                                            >
                                                <span className={styles.componentHeader}>
                                                    <span>{component.displayName}</span>
                                                    <EditIcon sx={{ fontSize: 16 }} />
                                                </span>
                                                <span className={styles.componentBody}>
                                                    {componentTypeLabel(component.type, i18n)}
                                                    {component.details?.programStage && ` · ${programStages.find(stage => stage.id === component.details?.programStage)?.label ?? component.details.programStage}`}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptyState}>
                                        <strong>{i18n.t('This section has no components yet.')}</strong>
                                        <span>{i18n.t('Add personal details, event cards or an event table.')}</span>
                                    </div>
                                )}
                                <Button
                                    className={styles.addComponent}
                                    secondary
                                    icon={<AddIcon fontSize="small" />}
                                    onClick={() => setDialogTarget({
                                        kind: 'component',
                                        component: createProfileComponent(activeTab.components.length),
                                        isNew: true,
                                    })}
                                >
                                    {i18n.t('Add component')}
                                </Button>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <strong>{i18n.t('Add the first profile section.')}</strong>
                                <span>{i18n.t('Sections are displayed as tabs in the profile.')}</span>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {dialogTarget && (
                <ConfigurationDialog
                    i18n={i18n}
                    target={dialogTarget}
                    identityCard={draft.identityCard}
                    attributes={attributes}
                    dataElements={dataElements}
                    programStages={programStages}
                    onClose={() => setDialogTarget(null)}
                    onSaveIdentity={identityCard => {
                        updateDraft({ ...draft, identityCard });
                        setDialogTarget(null);
                    }}
                    onSaveTab={saveTab}
                    onSaveComponent={saveComponent}
                    onDelete={dialogTarget.kind === 'identity' ? undefined : deleteTarget}
                />
            )}
        </WithPadding>
    );
}
