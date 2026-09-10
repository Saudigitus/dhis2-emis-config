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
    loading: boolean;
    onClose: () => void;
    onApply: (value: IdentityCardConfig) => void;
};

type FormValues = {
    attribute?: string;
    variables?: string[];
    separator?: string;
    styled?: boolean | string;
};

const nonEmptyValues = (values: string[] | undefined) => (values ?? [])
    .map(value => value?.trim())
    .filter((value): value is string => Boolean(value));

const hasValidBadgeValue = (badge: IdentityBadge) => (
    (badge?.source === 'ATTRIBUTE' || badge?.source === 'DATA_ELEMENTS')
    && Boolean(badge?.variable?.trim())
);

const getInitialValues = (section: IdentitySection, identityCard: IdentityCardConfig): FormValues => {
    if (section === 'photo') {
        return { attribute: identityCard?.photo?.attribute?.trim() || undefined };
    }
    if (section === 'title' || section === 'subtitle') {
        return {
            variables: nonEmptyValues(identityCard?.[section]?.attributes),
            separator: identityCard?.[section]?.separator ?? '',
        };
    }
    const badges = (identityCard?.badges ?? []).filter(hasValidBadgeValue);
    return {
        variables: badges.map(badge => `${badge.source}:${badge.variable?.trim()}`),
        styled: badges.length > 0 ? badges.every(badge => badge?.styled) : true,
    };
};

export default function IdentityConfigurationDialog({
    i18n,
    section,
    identityCard,
    attributes,
    dataElements,
    loading,
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
            onApply({ ...identityCard, photo: { attribute: values?.attribute?.trim() ?? '' } });
            return;
        }
        if (section === 'title' || section === 'subtitle') {
            onApply({
                ...identityCard,
                [section]: {
                    attributes: nonEmptyValues(values?.variables),
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
        const badges = nonEmptyValues(values?.variables)
            .filter(item => {
                const [source, ...variableParts] = item.split(':');
                return (source === 'ATTRIBUTE' || source === 'DATA_ELEMENTS')
                    && Boolean(variableParts.join(':').trim());
            })
            .map((item, order) => {
                const [source, ...variableParts] = item.split(':');
                return {
                    ...previousBadges.get(item),
                    order,
                    source: source as IdentityBadge['source'],
                    variable: variableParts.join(':').trim(),
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
                loading={loading}
                onCancel={onClose}
                onSubmit={apply}
            />
        </Modal>
    );
}
