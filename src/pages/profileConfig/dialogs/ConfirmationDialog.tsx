import React from 'react';
import { Button, Modal, ModalTitle } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';

type Props = {
    i18n: D2I18n;
    type: 'delete' | 'update';
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmationDialog({ i18n, type, loading, onCancel, onConfirm }: Props) {
    const deleting = type === 'delete';
    const deleteLoading = deleting && loading;

    return (
        <Modal onClose={() => { if (!deleteLoading) onCancel(); }} position="middle" small>
            <div>
                <ModalTitle>
                    {deleting ? i18n.t('Confirm deletion') : i18n.t('Confirm update')}
                </ModalTitle>
                <div className={styles.confirmationContent}>
                    {deleting
                        ? i18n.t('Are you sure you want to delete this item?')
                        : i18n.t('Are you sure you want to update this item?')}
                </div>
                <div className={styles.confirmationActions}>
                    <Button secondary disabled={deleteLoading} onClick={onCancel}>{i18n.t('Cancel')}</Button>
                    {deleting ? (
                        <Button destructive loading={deleteLoading} onClick={onConfirm}>{i18n.t('Delete')}</Button>
                    ) : (
                        <Button primary onClick={onConfirm}>{i18n.t('Update')}</Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
