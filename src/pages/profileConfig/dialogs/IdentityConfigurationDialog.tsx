import React, { useMemo } from 'react';
import { Modal } from '@dhis2/ui';
import { D2I18n } from 'dhis2-semis-types';
import FormModalContent from '../../../components/saveConfiguration/ModalContent';
import { IdentityBadge, IdentityCardConfig, VariableOption } from '../types';
import { buildIdentityFormFields } from '../utils/identityFormFields';

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

type FormValues = {
    attribute?: string;
    variables?: string[];
    separator?: string;
    styled?: boolean | string;
};

const getInitialValues = (section: IdentitySection, identityCard: IdentityCardConfig): FormValues => {
    if (section === 'photo') {
        return { attribute: identityCard?.photo?.attribute ?? '' };
    }
    if (section === 'title' || section === 'subtitle') {
        return {
            variables: identityCard?.[section]?.attributes ?? [],
            separator: identityCard?.[section]?.separator ?? '',
        };
    }
    return {
        variables: identityCard?.badges?.map(badge => `${badge?.source}:${badge?.variable ?? ''}`) ?? [],
        styled: identityCard?.badges?.every(badge => badge?.styled) ?? true,
    };
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
    const initialValues = useMemo(
        () => getInitialValues(section, identityCard),
        [identityCard, section],
    );
    const formFields = useMemo(() => buildIdentityFormFields({
        i18n,
        section,
        attributes,
        dataElements,
    }), [attributes, dataElements, i18n, section]);

    const apply = (values: FormValues) => {
        if (section === 'photo') {
            onApply({ ...identityCard, photo: { attribute: values?.attribute ?? '' } });
            return;
        }
        if (section === 'title' || section === 'subtitle') {
            onApply({
                ...identityCard,
                [section]: {
                    attributes: values?.variables ?? [],
                    separator: values?.separator ?? '',
                },
            });
            return;
        }

        const previousBadges = new Map<string, IdentityBadge>(
            (identityCard?.badges ?? []).map(badge => [
                `${badge?.source}:${badge?.variable ?? ''}`,
                badge,
            ] as const),
        );
        const styled = values?.styled === true || String(values?.styled) === 'true';
        const badges = (values?.variables ?? []).map((item, order) => {
            const [source, ...variableParts] = item.split(':');
            return {
                ...previousBadges.get(item),
                order,
                source: source as IdentityBadge['source'],
                variable: variableParts.join(':'),
                styled,
            };
        });
        onApply({ ...identityCard, badges });
    };

    return (
        <Modal onClose={onClose} position="middle" large>
            <FormModalContent
                formFields={formFields}
                initialValues={initialValues}
                loading={false}
                onCancel={onClose}
                onSubmit={apply}
            />
        </Modal>
    );
}
