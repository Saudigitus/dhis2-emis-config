import React, { useMemo, useState } from 'react';
import { Button, Modal } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import FormModalContent from '../../../components/saveConfiguration/ModalContent';
import styles from '../profileConfig.module.css';
import { ProfileComponentConfig, ProfileTabConfig } from '../types';
import { buildTabFormFields } from '../utils/tabFormFields';

type Props = {
    i18n: D2I18n;
    tab: ProfileTabConfig;
    isNew?: boolean;
    programStages: Array<{ id: string; label: string }>;
    onClose: () => void;
    onApply: (value: ProfileTabConfig) => void;
    onDelete?: () => void;
};

const normalizeComponent = (component: ProfileComponentConfig, order: number): ProfileComponentConfig => ({
    ...component,
    displayName: component?.displayName?.trim() ?? '',
    editable: component?.editable === true || String(component?.editable) === 'true',
    order,
    size: component?.size || 'FULL',
    type: component?.type || 'TEI_FORM',
    details: component?.type === 'EVENT_TABLE' || component?.type === 'EVENT_CARDS'
        ? {
            pageSize: Math.max(1, Number(component?.details?.pageSize) || 1),
            programStage: component?.details?.programStage ?? '',
        }
        : undefined,
});

export default function TabConfigurationDialog({
    i18n,
    tab,
    isNew,
    programStages,
    onClose,
    onApply,
    onDelete,
}: Props) {
    const [trackedValues, setTrackedValues] = useState<Partial<ProfileTabConfig>>({});
    const [error, setError] = useState('');

    const formFields = useMemo(() => buildTabFormFields({
        i18n,
        tab,
        trackedValues,
        programStages,
    }), [i18n, programStages, trackedValues]);

    const apply = (values: ProfileTabConfig) => {
        if (!values.displayName?.trim()) {
            setError(i18n.t('The section name is required.'));
            return;
        }

        const components = (values?.components ?? []).map(normalizeComponent);
        if (components?.some(component => !component?.displayName)) {
            setError(i18n.t('The component name is required.'));
            return;
        }
        if (components?.some(component => (
            (component?.type === 'EVENT_TABLE' || component?.type === 'EVENT_CARDS')
            && !component?.details?.programStage
        ))) {
            setError(i18n.t('Select a program stage for every event component.'));
            return;
        }

        onApply({
            ...values,
            displayName: values?.displayName?.trim() ?? '',
            order: Math.max(0, Math.floor(Number(values?.order) || 0)),
            components,
        });
    };

    return (
        <Modal onClose={onClose} position="middle" large>
            {onDelete && (
                <div className={styles.formModalDelete}>
                    <Button destructive onClick={onDelete}>{i18n.t('Delete')}</Button>
                </div>
            )}
            <FormModalContent
                formFields={formFields}
                initialValues={{}}
                loading={false}
                setTrackedValues={setTrackedValues}
                onCancel={onClose}
                onSubmit={apply}
            />
            {error && <p className={styles.formModalError}>{error}</p>}
        </Modal>
    );
}
