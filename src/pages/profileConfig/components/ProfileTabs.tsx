import React from 'react';
import { DeleteOutline as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { DialogTarget, ProfileTabConfig } from '../types';

type Props = {
    i18n: D2I18n;
    tabs: ProfileTabConfig[];
    activeTabId: string;
    onSelect: (id: string) => void;
    onConfigure: (target: DialogTarget) => void;
    onDelete: (target: Extract<DialogTarget, { kind: 'tab' }>) => void;
};

export default function ProfileTabs({
    i18n,
    tabs,
    activeTabId,
    onSelect,
    onConfigure,
    onDelete,
}: Props) {
    return (
        <div className={styles.tabsRow}>
            {tabs?.map(tab => (
                <div
                    key={tab.id}
                    className={`${styles.tabItem} ${tab.id === activeTabId ? styles.tabSelected : ''}`}
                    style={tab.id === activeTabId ? { borderBottomColor: tab.color } : undefined}
                >
                    <button
                        type="button"
                        className={styles.tab}
                        onClick={() => onSelect(tab.id)}
                        title={i18n.t('Select section')}
                    >
                        {tab.displayName}
                    </button>
                    <span className={styles.itemActions}>
                        <button
                            type="button"
                            className={styles.iconAction}
                            onClick={() => onConfigure({ kind: 'tab', tab })}
                            title={i18n.t('Edit section')}
                            aria-label={i18n.t('Edit section')}
                        >
                            <EditIcon sx={{ fontSize: 16 }} />
                        </button>
                        <button
                            type="button"
                            className={`${styles.iconAction} ${styles.deleteAction}`}
                            onClick={() => onDelete({ kind: 'tab', tab })}
                            title={i18n.t('Delete section')}
                            aria-label={i18n.t('Delete section')}
                        >
                            <DeleteIcon sx={{ fontSize: 17 }} />
                        </button>
                    </span>
                </div>
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
    );
}
