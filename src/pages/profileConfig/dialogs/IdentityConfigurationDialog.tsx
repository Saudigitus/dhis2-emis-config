import React, { useState } from 'react';
import { D2I18n } from 'dhis2-semis-types';
import { IdentityCardConfig, VariableOption } from '../types';
import ConfigurationModal from './ConfigurationModal';
import IdentityFields from './IdentityFields';

type IdentitySection = 'photo' | 'title' | 'subtitle' | 'badges';

type Props = {
    i18n: D2I18n;
    section: IdentitySection;
    identityCard: IdentityCardConfig;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    onClose: () => void;
    onApply: (value: IdentityCardConfig) => void;
};

export default function IdentityConfigurationDialog({
    i18n,
    section,
    identityCard,
    attributes,
    dataElements,
    onClose,
    onApply,
}: Props) {
    const [draft, setDraft] = useState(identityCard);
    const title = {
        photo: i18n.t('Configure photo'),
        title: i18n.t('Configure title'),
        subtitle: i18n.t('Configure subtitle'),
        badges: i18n.t('Configure badges'),
    }[section];

    return (
        <ConfigurationModal i18n={i18n} title={title} onClose={onClose} onApply={() => onApply(draft)}>
            <IdentityFields
                i18n={i18n}
                section={section}
                value={draft}
                attributes={attributes}
                dataElements={dataElements}
                onChange={setDraft}
            />
        </ConfigurationModal>
    );
}
