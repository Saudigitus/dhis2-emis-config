import React from 'react';
import { Button } from '@dhis2/ui';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';

type Props = {
    i18n: D2I18n;
    onBack: () => void;
};

export default function ProfileHeader({ i18n, onBack }: Props) {
    return (
        <div className={styles.pageHeader}>
            <div>
                <h1>{i18n.t('Profile configuration')}</h1>
                <p>{i18n.t('Click any highlighted area to choose its name, variables and presentation.')}</p>
            </div>
            <Button secondary icon={<ArrowBackIcon fontSize="small" />} onClick={onBack}>
                {i18n.t('Back')}
            </Button>
        </div>
    );
}
