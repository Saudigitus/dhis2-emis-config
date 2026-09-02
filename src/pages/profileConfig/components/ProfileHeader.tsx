import React from 'react';
import { Button, ButtonStrip } from '@dhis2/ui';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';

type Props = {
    i18n: D2I18n;
    dirty: boolean;
    saving: boolean;
    onBack: () => void;
    onSave: () => void;
};

export default function ProfileHeader({ i18n, dirty, saving, onBack, onSave }: Props) {
    return (
        <div className={styles.pageHeader}>
            <div>
                <h1>{i18n.t('Profile configuration')}</h1>
                <p>{i18n.t('Click any highlighted area to choose its name, variables and presentation.')}</p>
            </div>
            <ButtonStrip>
                <Button secondary icon={<ArrowBackIcon fontSize="small" />} onClick={onBack}>
                    {i18n.t('Back')}
                </Button>
                <Button primary loading={saving} disabled={!dirty || saving} onClick={onSave}>
                    {i18n.t('Save configuration')}
                </Button>
            </ButtonStrip>
        </div>
    );
}
