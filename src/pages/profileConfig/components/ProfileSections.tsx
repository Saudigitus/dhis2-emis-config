import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { DialogTarget, ProfileTabConfig } from '../types';
import ActiveTabComponents from './ActiveTabComponents';
import ProfileTabs from './ProfileTabs';

type Props = {
    i18n: D2I18n;
    tabs: ProfileTabConfig[];
    activeTabId: string;
    programStages: Array<{ id: string; label: string }>;
    onSelectTab: (id: string) => void;
    onConfigure: (target: DialogTarget) => void;
    onDelete: (target: Extract<DialogTarget, { kind: 'tab' | 'component' }>) => void;
};

export default function ProfileSections({
    i18n,
    tabs,
    activeTabId,
    programStages,
    onSelectTab,
    onConfigure,
    onDelete,
}: Props) {
    const activeTab = tabs?.find(tab => tab?.id === activeTabId);

    return (
        <section className={styles.workspace} aria-label={i18n.t('Profile sections')}>
            <ProfileTabs
                i18n={i18n}
                tabs={tabs}
                activeTabId={activeTabId}
                onSelect={onSelectTab}
                onConfigure={onConfigure}
                onDelete={onDelete}
            />
            <div className={styles.canvas}>
                <ActiveTabComponents
                    i18n={i18n}
                    activeTab={activeTab}
                    programStages={programStages}
                    onConfigure={onConfigure}
                    onDelete={onDelete}
                />
            </div>
        </section>
    );
}
