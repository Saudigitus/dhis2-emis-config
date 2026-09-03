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
    const [draft, setDraft] = useState(card);
    const [error, setError] = useState('');

    const apply = () => {
        if (!draft.variable) {
            setError(i18n.t('Select a variable.'));
            return;
        }
        const selectedVariable = [...attributes, ...dataElements].find(variable => (
            variable.id === draft.variable && variable.source === draft.source
        ));
        onApply({
            ...draft,
            displayName: draft.displayName.trim() || selectedVariable?.label || draft.variable,
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
                value={draft}
                attributes={attributes}
                dataElements={dataElements}
                onChange={setDraft}
            />
        </ConfigurationModal>
    );
}
