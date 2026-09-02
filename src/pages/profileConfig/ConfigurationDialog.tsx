import React, { useMemo, useState } from 'react';
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import ComponentFields from './dialogs/ComponentFields';
import IdentityFields from './dialogs/IdentityFields';
import SummaryCardFields from './dialogs/SummaryCardFields';
import TabFields from './dialogs/TabFields';
import styles from './profileConfig.module.css';
import {
    IdentityCardConfig,
    ProfileComponentConfig,
    ProfileSummaryCard,
    ProfileTabConfig,
    VariableOption,
} from './types';

export type DialogTarget =
    | { kind: 'identity'; section: 'photo' | 'title' | 'subtitle' | 'badges' }
    | { kind: 'summaryCard'; card: ProfileSummaryCard; isNew?: boolean }
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
    onSaveSummaryCard: (value: ProfileSummaryCard) => void;
    onSaveTab: (value: ProfileTabConfig) => void;
    onSaveComponent: (value: ProfileComponentConfig) => void;
    onDelete?: () => void;
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
    onSaveSummaryCard,
    onSaveTab,
    onSaveComponent,
    onDelete,
}: Props) {
    const [identityDraft, setIdentityDraft] = useState(identityCard);
    const [summaryCardDraft, setSummaryCardDraft] = useState<ProfileSummaryCard | null>(
        target.kind === 'summaryCard' ? target.card : null,
    );
    const [tabDraft, setTabDraft] = useState<ProfileTabConfig | null>(target.kind === 'tab' ? target.tab : null);
    const [componentDraft, setComponentDraft] = useState<ProfileComponentConfig | null>(
        target.kind === 'component' ? target.component : null,
    );
    const [error, setError] = useState('');

    const title = useMemo(() => {
        if (target.kind === 'summaryCard') return i18n.t('Configure summary card');
        if (target.kind === 'tab') return target.isNew ? i18n.t('Add section') : i18n.t('Configure section');
        if (target.kind === 'component') return target.isNew ? i18n.t('Add component') : i18n.t('Configure component');
        return {
            photo: i18n.t('Configure photo'),
            title: i18n.t('Configure title'),
            subtitle: i18n.t('Configure subtitle'),
            badges: i18n.t('Configure badges'),
        }[target.section];
    }, [i18n, target]);

    const save = () => {
        if (target.kind === 'identity') {
            onSaveIdentity(identityDraft);
            return;
        }

        if (target.kind === 'summaryCard' && summaryCardDraft) {
            if (!summaryCardDraft.variable) {
                setError(i18n.t('Select a variable.'));
                return;
            }
            const selectedVariable = [...attributes, ...dataElements].find(variable => (
                variable.id === summaryCardDraft.variable && variable.source === summaryCardDraft.source
            ));
            onSaveSummaryCard({
                ...summaryCardDraft,
                displayName: summaryCardDraft.displayName.trim() || selectedVariable?.label || summaryCardDraft.variable,
            });
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

    return (
        <Modal onClose={onClose} position="middle" large>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>
                <div className={styles.dialogForm}>
                    {target.kind === 'identity' && (
                        <IdentityFields
                            i18n={i18n}
                            section={target.section}
                            value={identityDraft}
                            attributes={attributes}
                            dataElements={dataElements}
                            onChange={setIdentityDraft}
                        />
                    )}
                    {target.kind === 'summaryCard' && summaryCardDraft && (
                        <SummaryCardFields
                            i18n={i18n}
                            value={summaryCardDraft}
                            attributes={attributes}
                            dataElements={dataElements}
                            onChange={setSummaryCardDraft}
                        />
                    )}
                    {target.kind === 'tab' && tabDraft && (
                        <TabFields i18n={i18n} value={tabDraft} onChange={setTabDraft} />
                    )}
                    {target.kind === 'component' && componentDraft && (
                        <ComponentFields
                            i18n={i18n}
                            value={componentDraft}
                            programStages={programStages}
                            onChange={setComponentDraft}
                        />
                    )}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </ModalContent>
            <ModalActions>
                <div className={styles.dialogActions}>
                    {onDelete && target.kind !== 'identity' && !target.isNew && (
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
