import React, { ReactNode } from 'react';
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';

type Props = {
    i18n: D2I18n;
    title: string;
    children: ReactNode;
    error?: string;
    onClose: () => void;
    onApply: () => void;
    onDelete?: () => void;
};

export default function ConfigurationModal({
    i18n,
    title,
    children,
    error,
    onClose,
    onApply,
    onDelete,
}: Props) {
    return (
        <Modal onClose={onClose} position="middle" large>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>
                <div className={styles.dialogForm}>
                    {children}
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </ModalContent>
            <ModalActions>
                <div className={styles.dialogActions}>
                    {onDelete && <Button destructive onClick={onDelete}>{i18n.t('Delete')}</Button>}
                    <ButtonStrip end className={styles.dialogActionsRight}>
                        <Button secondary onClick={onClose}>{i18n.t('Cancel')}</Button>
                        <Button primary onClick={onApply}>{i18n.t('Apply')}</Button>
                    </ButtonStrip>
                </div>
            </ModalActions>
        </Modal>
    );
}
