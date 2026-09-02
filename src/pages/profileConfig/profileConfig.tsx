import React from 'react';
import { WithPadding } from 'dhis2-semis-components';
import { D2I18n } from 'dhis2-semis-types';
import ConfigurationDialog from './ConfigurationDialog';
import ProfileHeader from './components/ProfileHeader';
import ProfileSections from './components/ProfileSections';
import SummaryCards from './components/SummaryCards';
import useProfileConfiguration from './hooks/useProfileConfiguration';
import IdDetails from './idDetails/idDetails';
import styles from './profileConfig.module.css';

export default function ProfileConfiguration({ i18n }: { i18n: D2I18n }) {
    const profile = useProfileConfiguration(i18n);

    return (
        <WithPadding p="24px">
            <div className={styles.page}>
                <ProfileHeader
                    i18n={i18n}
                    dirty={profile.dirty}
                    saving={profile.saving}
                    onBack={profile.goBack}
                    onSave={profile.saveConfiguration}
                />
                <IdDetails
                    i18n={i18n}
                    config={profile.draft.identityCard}
                    attributes={profile.attributes}
                    dataElements={profile.dataElements}
                    onConfigure={section => profile.openDialog({ kind: 'identity', section })}
                />
                <SummaryCards
                    i18n={i18n}
                    cards={profile.draft.summaryCards}
                    onConfigure={profile.openDialog}
                />
                <ProfileSections
                    i18n={i18n}
                    tabs={profile.draft.tabs}
                    activeTabId={profile.activeTabId}
                    programStages={profile.programStages}
                    onSelectTab={profile.selectTab}
                    onConfigure={profile.openDialog}
                />
            </div>

            {profile.dialogTarget && (
                <ConfigurationDialog
                    i18n={i18n}
                    target={profile.dialogTarget}
                    identityCard={profile.draft.identityCard}
                    attributes={profile.attributes}
                    dataElements={profile.dataElements}
                    programStages={profile.programStages}
                    onClose={profile.closeDialog}
                    onSaveIdentity={profile.saveIdentity}
                    onSaveSummaryCard={profile.saveSummaryCard}
                    onSaveTab={profile.saveTab}
                    onSaveComponent={profile.saveComponent}
                    onDelete={profile.dialogTarget.kind === 'identity' ? undefined : profile.deleteTarget}
                />
            )}
        </WithPadding>
    );
}
