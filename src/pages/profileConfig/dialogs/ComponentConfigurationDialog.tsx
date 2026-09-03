import React, { useMemo, useState } from 'react';
import { Button, Modal, ModalTitle } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import FormModalContent from '../../../components/saveConfiguration/ModalContent';
import styles from '../profileConfig.module.css';
import { ProfileComponentConfig } from '../types';
import { buildComponentFields } from '../utils/componentFormFields';

type Props = {
    i18n: D2I18n;
    component: ProfileComponentConfig;
    isNew?: boolean;
    programStages: Array<{ id: string; label: string }>;
    onClose: () => void;
    onApply: (value: ProfileComponentConfig) => void;
    onDelete?: () => void;
};

export default function ComponentConfigurationDialog({
    i18n,
    component,
    isNew,
    programStages,
    onClose,
    onApply,
    onDelete,
}: Props) {
    const [trackedValues, setTrackedValues] = useState<Partial<ProfileComponentConfig>>({});
    const [error, setError] = useState('');
    const currentType = trackedValues?.type ?? component?.type;
    const formFields = useMemo(() => [{
        visible: true,
        description: '',
        name: '',
        fields: buildComponentFields({ i18n, type: currentType, programStages }),
    }], [currentType, i18n, isNew, programStages]);

    const apply = (values: ProfileComponentConfig) => {
        if (!values?.displayName?.trim()) {
            setError(i18n.t('The component name is required.'));
            return;
        }
        if (!values?.type) {
            setError(i18n.t('Select a component type.'));
            return;
        }
        const isEventComponent = values?.type === 'EVENT_TABLE' || values?.type === 'EVENT_CARDS';
        if (isEventComponent && !values?.details?.programStage) {
            setError(i18n.t('Select a program stage.'));
            return;
        }

        onApply({
            ...component,
            ...values,
            displayName: values.displayName.trim(),
            editable: values?.editable === true || String(values?.editable) === 'true',
            order: Number.isFinite(Number(component?.order)) ? Number(component.order) : 0,
            details: isEventComponent
                ? {
                    pageSize: Math.max(1, Number(values?.details?.pageSize) || 1),
                    programStage: values?.details?.programStage ?? '',
                }
                : undefined,
        });
    };

    return (
        <Modal onClose={onClose} position="middle" large>
            <ModalTitle>{isNew ? i18n.t('Add component') : i18n.t('Configure component')}</ModalTitle>
            {onDelete && (
                <div className={styles.formModalDelete}>
                    <Button destructive onClick={onDelete}>{i18n.t('Delete')}</Button>
                </div>
            )}
            <FormModalContent
                formFields={formFields}
                initialValues={isNew ? { order: component?.order } : component}
                loading={false}
                setTrackedValues={setTrackedValues}
                onCancel={onClose}
                onSubmit={apply}
            />
            {error && <p className={styles.formModalError}>{error}</p>}
        </Modal>
    );
}
