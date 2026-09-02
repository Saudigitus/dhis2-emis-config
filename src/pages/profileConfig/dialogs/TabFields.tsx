import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { ProfileTabConfig } from '../types';

type Props = {
    i18n: D2I18n;
    value: ProfileTabConfig;
    onChange: (value: ProfileTabConfig) => void;
};

export default function TabFields({ i18n, value, onChange }: Props) {
    return (
        <div className={styles.fieldGrid}>
            <label className={styles.field}>
                {i18n.t('Section name')}
                <input
                    className={styles.input}
                    autoFocus
                    value={value.displayName}
                    onChange={event => onChange({ ...value, displayName: event.target.value })}
                />
            </label>
            <label className={styles.field}>
                {i18n.t('Accent color')}
                <input
                    className={styles.input}
                    type="color"
                    value={value.color || '#147CD7'}
                    onChange={event => onChange({ ...value, color: event.target.value })}
                />
            </label>
        </div>
    );
}
