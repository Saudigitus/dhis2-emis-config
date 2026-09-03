import { D2I18n } from 'dhis2-semis-types';

const buildField = ({
    name,
    label,
    valueType,
    order,
    required = true,
    visible = true,
    options,
}: {
    name: string;
    label: string;
    valueType: string;
    order: number;
    required?: boolean;
    visible?: boolean;
    options?: Array<{ value: string; label: string }>;
}) => ({
    id: name,
    name,
    visible,
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

export const buildTabFormFields = (i18n: D2I18n) => [{
    visible: true,
    description: '',
    name: i18n.t('Tab details'),
    fields: [
        buildField({
            name: 'displayName',
            label: i18n.t('Display name'),
            valueType: 'TEXT',
            order: 0,
        }),
        buildField({
            name: 'color',
            label: i18n.t('Color'),
            valueType: 'TEXT',
            required: false,
            order: 1,
        }),
        buildField({
            name: 'order',
            label: i18n.t('Order'),
            valueType: 'INTEGER_ZERO_OR_POSITIVE',
            order: 2,
        }),
    ],
}];
