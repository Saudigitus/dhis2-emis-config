import React, { useMemo, useState } from 'react';
import { Modal, ModalTitle } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import FormModalContent from '../../../components/saveConfiguration/ModalContent';
import styles from '../profileConfig.module.css';
import { ProfileTabConfig } from '../types';
import { buildTabFormFields } from '../utils/tabFormFields';

type Props = {
    i18n: D2I18n;
    tab: ProfileTabConfig;
    isNew?: boolean;
    loading: boolean;
    onClose: () => void;
    onApply: (value: ProfileTabConfig) => void;
};

export default function TabConfigurationDialog({
    i18n,
    tab,
    isNew,
    loading,
    onClose,
    onApply,
}: Props) {
    const [error, setError] = useState('');

    const formFields = useMemo(() => buildTabFormFields(i18n), [i18n]);
    const initialValues = useMemo(() => ({
        displayName: tab?.displayName ?? '',
        color: tab?.color ?? '',
        order: tab?.order ?? 0,
    }), [tab]);

    const apply = (values: Partial<ProfileTabConfig>) => {
        if (!values.displayName?.trim()) {
            setError(i18n.t('The section name is required.'));
            return;
        }

        onApply({
            ...tab,
            ...values,
            displayName: values?.displayName?.trim() ?? '',
            order: Math.max(0, Math.floor(Number(values?.order) || 0)),
            components: tab?.components ?? [],
        });
    };

    return (
        <Modal onClose={onClose} position="middle" large>
            <div>
                <ModalTitle>{isNew ? i18n.t('Add section') : i18n.t('Configure section')}</ModalTitle>
                <FormModalContent
                    formFields={formFields}
                    initialValues={initialValues}
                    loading={loading}
                    onCancel={onClose}
                    onSubmit={apply}
                />
                {error && <p className={styles.formModalError}>{error}</p>}
            </div>
        </Modal>
    );
}
