import React, { useState } from 'react';
import { WithPadding } from 'dhis2-semis-components';
import { D2I18n } from 'dhis2-semis-types';
import ConfigurationDialog from './ConfigurationDialog';
import ProfileHeader from './components/ProfileHeader';
import ProfileSections from './components/ProfileSections';
import SummaryCards from './components/SummaryCards';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import useProfileConfiguration from './hooks/useProfileConfiguration';
import IdDetails from './idDetails/idDetails';
import styles from './profileConfig.module.css';
import { DialogTarget } from './types';

type Confirmation = {
    type: 'delete' | 'update';
    action: () => void | Promise<void>;
};

export default function ProfileConfiguration({ i18n }: { i18n: D2I18n }) {
    const profile = useProfileConfiguration();
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

    const confirm = (type: Confirmation['type'], action: Confirmation['action']) => {
        setConfirmation({ type, action });
    };

    const confirmDelete = (target?: Extract<DialogTarget, { kind: 'tab' | 'component' }>) => {
        confirm('delete', () => profile.deleteTarget(target));
    };

    const runConfirmedAction = async () => {
        const action = confirmation?.action;

        if (confirmation?.type === 'delete') {
            await action?.();
            setConfirmation(null);
            return;
        }

        setConfirmation(null);
        await action?.();
    };

    return (
        <WithPadding p="24px">
            <div className={styles.page}>
                <ProfileHeader
                    i18n={i18n}
                    onBack={profile.goBack}
                />
                <IdDetails
                    i18n={i18n}
                    config={profile.profileConfig.identityCard}
                    attributes={profile.attributes}
                    dataElements={profile.dataElements}
                    onConfigure={section => profile.openDialog({ kind: 'identity', section })}
                />
                <SummaryCards
                    i18n={i18n}
                    program={profile.program?.id!}
                />
                <ProfileSections
                    i18n={i18n}
                    tabs={profile.profileConfig.tabs}
                    activeTabId={profile.activeTabId}
                    programStages={profile.programStages}
                    onSelectTab={profile.selectTab}
                    onConfigure={profile.openDialog}
                    onDelete={confirmDelete}
                />
            </div>

            {profile.dialogTarget && (
                <ConfigurationDialog
                    i18n={i18n}
                    target={profile.dialogTarget}
                    identityCard={profile.profileConfig.identityCard}
                    attributes={profile.attributes}
                    dataElements={profile.dataElements}
                    programStages={profile.programStages}
                    loading={profile.loading}
                    onClose={profile.closeDialog}
                    onApplyIdentity={value => confirm('update', () => profile.updateIdentity(value))}
                    onApplyTab={value => profile.dialogTarget?.kind === 'tab' && profile.dialogTarget.isNew
                        ? profile.updateTab(value)
                        : confirm('update', () => profile.updateTab(value))}
                    onApplyComponent={value => profile.dialogTarget?.kind === 'component' && profile.dialogTarget.isNew
                        ? profile.updateComponent(value)
                        : confirm('update', () => profile.updateComponent(value))}
                />
            )}

            {confirmation && (
                <ConfirmationDialog
                    i18n={i18n}
                    type={confirmation.type}
                    loading={profile.loading}
                    onCancel={() => setConfirmation(null)}
                    onConfirm={runConfirmedAction}
                />
            )}
        </WithPadding>
    );
}
