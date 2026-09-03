import React, { useState } from 'react';
import { D2I18n } from 'dhis2-semis-types';
import { ProfileSummaryCard, VariableOption } from '../types';
import ConfigurationModal from './ConfigurationModal';
import SummaryCardFields from './SummaryCardFields';

type Props = {
    i18n: D2I18n;
    card: ProfileSummaryCard;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    onClose: () => void;
    onApply: (value: ProfileSummaryCard) => void;
    onDelete?: () => void;
};

export default function SummaryCardConfigurationDialog({
    i18n,
    card,
    attributes,
    dataElements,
    onClose,
    onApply,
    onDelete,
}: Props) {
    const [value, setValue] = useState(card);
    const [error, setError] = useState('');

    const apply = () => {
        if (!value.variable) {
            setError(i18n.t('Select a variable.'));
            return;
        }
        const selectedVariable = [...attributes, ...dataElements].find(variable => (
            variable.id === value.variable && variable.source === value.source
        ));
        onApply({
            ...value,
            displayName: value.displayName.trim() || selectedVariable?.label || value.variable,
        });
    };

    return (
        <ConfigurationModal
            i18n={i18n}
            title={i18n.t('Configure summary card')}
            error={error}
            onClose={onClose}
            onApply={apply}
            onDelete={onDelete}
        >
            <SummaryCardFields
                i18n={i18n}
                value={value}
                attributes={attributes}
                dataElements={dataElements}
                onChange={setValue}
            />
        </ConfigurationModal>
    );
}
