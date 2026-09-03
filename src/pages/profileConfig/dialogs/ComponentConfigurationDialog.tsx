import React, { useState } from 'react';
import { D2I18n } from 'dhis2-semis-types';
import { ProfileComponentConfig } from '../types';
import ComponentFields from './ComponentFields';
import ConfigurationModal from './ConfigurationModal';

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
    const [value, setValue] = useState(component);
    const [error, setError] = useState('');

    const apply = () => {
        if (!value.displayName.trim()) {
            setError(i18n.t('The component name is required.'));
            return;
        }
        if (value.type !== 'TEI_FORM' && !value.details?.programStage) {
            setError(i18n.t('Select a program stage.'));
            return;
        }
        onApply({ ...value, displayName: value.displayName.trim() });
    };

    return (
        <ConfigurationModal
            i18n={i18n}
            title={isNew ? i18n.t('Add component') : i18n.t('Configure component')}
            error={error}
            onClose={onClose}
            onApply={apply}
            onDelete={onDelete}
        >
            <ComponentFields
                i18n={i18n}
                value={value}
                programStages={programStages}
                onChange={setValue}
            />
        </ConfigurationModal>
    );
}
