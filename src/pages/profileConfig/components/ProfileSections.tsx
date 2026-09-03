import React from 'react';
import { Button } from '@dhis2/ui';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { DialogTarget, ProfileTabConfig } from '../types';

type Props = {
    i18n: D2I18n;
    tabs: ProfileTabConfig[];
    activeTabId: string;
    programStages: Array<{ id: string; label: string }>;
    onSelectTab: (id: string) => void;
    onConfigure: (target: DialogTarget) => void;
};

const componentTypeLabel = (type: ProfileTabConfig['components'][number]['type'], i18n: D2I18n) => ({
    TEI_FORM: i18n.t('Personal details'),
    EVENT_CARDS: i18n.t('Event cards'),
    EVENT_TABLE: i18n.t('Event table'),
}[type]);

export default function ProfileSections({
    i18n,
    tabs,
    activeTabId,
    programStages,
    onSelectTab,
    onConfigure,
}: Props) {
    const activeTab = tabs?.find(tab => tab?.id === activeTabId);

    return (
        <section className={styles.workspace} aria-label={i18n.t('Profile sections')}>
            <div className={styles.tabsRow}>
                {tabs?.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        className={`${styles.tab} ${tab.id === activeTabId ? styles.tabSelected : ''}`}
                        style={tab.id === activeTabId ? { borderBottomColor: tab.color } : undefined}
                        onClick={() => tab.id === activeTabId
                            ? onConfigure({ kind: 'tab', tab })
                            : onSelectTab(tab.id)}
                        title={i18n.t('Select; click again to configure')}
                    >
                        {tab.displayName}
                        {tab.id === activeTabId && <EditIcon className={styles.tabEdit} sx={{ fontSize: 14 }} />}
                    </button>
                ))}
                <button
                    type="button"
                    className={styles.addTab}
                    onClick={() => onConfigure({
                        kind: 'tab',
                        tab: { order: tabs?.length ?? 0, components: [] } as ProfileTabConfig,
                        isNew: true,
                    })}
                >
                    + {i18n.t('Add section')}
                </button>
            </div>

            <div className={styles.canvas}>
                {activeTab ? (
                    <>
                        {(activeTab?.components?.length ?? 0) > 0 ? (
                            <div className={styles.componentGrid}>
                                {activeTab?.components?.map(component => (
                                    <button
                                        type="button"
                                        key={`${activeTab.id}-${component.order}`}
                                        className={`${styles.componentCard} ${component.size === 'FULL' ? styles.componentFull : ''}`}
                                        onClick={() => onConfigure({ kind: 'component', component })}
                                    >
                                        <span className={styles.componentHeader}>
                                            <span>{component.displayName}</span>
                                            <EditIcon sx={{ fontSize: 16 }} />
                                        </span>
                                        <span className={styles.componentBody}>
                                            {componentTypeLabel(component.type, i18n)}
                                            {component?.details?.programStage && ` · ${programStages?.find(stage => stage?.id === component?.details?.programStage)?.label ?? component?.details?.programStage}`}
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
                            onClick={() => onConfigure({
                                kind: 'component',
                                component: { order: activeTab?.components?.length ?? 0 } as ProfileTabConfig['components'][number],
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
    );
}
