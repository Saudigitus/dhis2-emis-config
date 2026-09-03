import React from 'react';
import { Button } from '@dhis2/ui';
import { Add as AddIcon } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { DialogTarget, ProfileTabConfig } from '../types';
import ProfileComponentCard from './ProfileComponentCard';

type Props = {
    i18n: D2I18n;
    activeTab?: ProfileTabConfig;
    programStages: Array<{ id: string; label: string }>;
    onConfigure: (target: DialogTarget) => void;
    onDelete: (target: Extract<DialogTarget, { kind: 'component' }>) => void;
};

export default function ActiveTabComponents({
    i18n,
    activeTab,
    programStages,
    onConfigure,
    onDelete,
}: Props) {
    if (!activeTab) {
        return (
            <div className={styles.emptyState}>
                <strong>{i18n.t('Add the first profile section.')}</strong>
                <span>{i18n.t('Sections are displayed as tabs in the profile.')}</span>
            </div>
        );
    }

    const components = activeTab?.components ?? [];

    return (
        <>
            <div className={styles.componentToolbar}>
                <Button
                    secondary
                    icon={<AddIcon fontSize="small" />}
                    onClick={() => onConfigure({
                        kind: 'component',
                        component: { order: components.length } as ProfileTabConfig['components'][number],
                        isNew: true,
                    })}
                >
                    {i18n.t('Add component')}
                </Button>
            </div>
            {components.length > 0 ? (
                <div className={styles.componentGrid}>
                    {components.map(component => (
                        <ProfileComponentCard
                            key={`${activeTab.id}-${component.order}`}
                            i18n={i18n}
                            component={component}
                            programStages={programStages}
                            onConfigure={onConfigure}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <strong>{i18n.t('This section has no components yet.')}</strong>
                    <span>{i18n.t('Add personal details, event cards or an event table.')}</span>
                </div>
            )}
        </>
    );
}
