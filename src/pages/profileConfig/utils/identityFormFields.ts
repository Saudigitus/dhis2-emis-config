import { D2I18n } from 'dhis2-semis-types';
import { VariableOption } from '../types';

type IdentitySection = 'photo' | 'title' | 'subtitle' | 'badges';
type Option = { value: string; label: string };

const field = ({
    name,
    label,
    valueType,
    order,
    options,
    required = false,
}: {
    name: string;
    label: string;
    valueType: string;
    order: number;
    options?: Option[];
    required?: boolean;
}) => ({
    id: name,
    name,
    visible: true,
    required,
    disabled: false,
    order,
    type: valueType,
    labelName: label,
    description: '',
    content: '',
    valueType,
    displayName: label,
    header: label,
    ...(options ? {
        options: {
            optionSet: {
                id: name,
                options,
            },
        },
    } : {}),
});

const variableOptions = (variables: VariableOption[]): Option[] => variables?.map(variable => ({
    value: variable?.id,
    label: variable?.label,
})) ?? [];

export const buildIdentityFormFields = ({
    i18n,
    section,
    attributes,
    dataElements,
}: {
    i18n: D2I18n;
    section: IdentitySection;
    attributes: VariableOption[];
    dataElements: VariableOption[];
}) => {
    let fields: Array<ReturnType<typeof field>>;

    if (section === 'photo') {
        fields = [field({
            name: 'attribute',
            label: i18n.t('Photo attribute'),
            valueType: 'LIST',
            order: 0,
            options: variableOptions(attributes?.filter(attribute => attribute?.valueType === 'IMAGE')),
        })];
    } else if (section === 'title' || section === 'subtitle') {
        fields = [
            field({
                name: 'variables',
                label: i18n.t('Variables'),
                valueType: 'MULTI_SELECT',
                order: 0,
                required: true,
                options: variableOptions(attributes),
            }),
            field({
                name: 'separator',
                label: i18n.t('Separator'),
                valueType: 'TEXT',
                order: 1,
            }),
        ];
    } else {
        const badgeOptions: Option[] = [
            ...(attributes?.map(variable => ({
                value: `ATTRIBUTE:${variable?.id}`,
                label: variable?.label,
            })) ?? []),
            ...(dataElements?.map(variable => ({
                value: `DATA_ELEMENTS:${variable?.id}`,
                label: variable?.label,
            })) ?? []),
        ];

        fields = [
            field({
                name: 'variables',
                label: i18n.t('Badge variables'),
                valueType: 'MULTI_SELECT',
                order: 0,
                options: badgeOptions,
            }),
            field({
                name: 'styled',
                label: i18n.t('Use option colors when available'),
                valueType: 'BOOLEAN',
                order: 1,
            }),
        ];
    }

    return [{
        visible: true,
        description: '',
        name: {
            photo: i18n.t('Configure photo'),
            title: i18n.t('Configure title'),
            subtitle: i18n.t('Configure subtitle'),
            badges: i18n.t('Configure badges'),
        }[section],
        fields,
    }];
};
