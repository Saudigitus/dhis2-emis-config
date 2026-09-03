import { D2I18n } from 'dhis2-semis-types';
import { ProfileTabConfig } from '../types';

type ProgramStageOption = { id: string; label: string };

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

export const buildTabFormFields = ({
    i18n,
    tab,
    trackedValues,
    programStages,
}: {
    i18n: D2I18n;
    tab: ProfileTabConfig;
    trackedValues?: Partial<ProfileTabConfig>;
    programStages: ProgramStageOption[];
}) => {
    const components = tab?.components ?? [];
    const currentComponents = trackedValues?.components ?? components;
    const componentIndexes = Array.from({ length: Math.max(components?.length ?? 0, 1) }, (_, index) => index);

    return [
        {
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
                    required:false,
                    order: 1,
                }),
                buildField({
                    name: 'order',
                    label: i18n.t('Order'),
                    valueType: 'INTEGER_ZERO_OR_POSITIVE',
                    order: 2,
                }),
            ],
        },
        ...componentIndexes.map(index => {
            const component = components?.[index];
            const currentType = currentComponents?.[index]?.type ?? component?.type;
            const isEventComponent = currentType === 'EVENT_TABLE' || currentType === 'EVENT_CARDS';
            const componentPath = `components[${index}]`;

            return {
                visible: true,
                description: '',
                name: `${i18n.t('Component')}`,
                fields: [
                    buildField({
                        name: `${componentPath}.displayName`,
                        label: i18n.t('Display name'),
                        valueType: 'TEXT',
                        order: 0,
                    }),
                    buildField({
                        name: `${componentPath}.editable`,
                        label: i18n.t('Editable'),
                        valueType: 'BOOLEAN',
                        order: 1,
                    }),
                    buildField({
                        name: `${componentPath}.size`,
                        label: i18n.t('Size'),
                        valueType: 'LIST',
                        order: 2,
                        options: [
                            { value: 'w1', label: 'w1' },
                            { value: 'w2', label: 'w2' },
                            { value: 'w3', label: 'w3' },
                            { value: 'w4', label: 'w4' },
                            { value: 'w5', label: 'w5' },
                            { value: 'w6', label: 'w6' },
                            { value: 'w7', label: 'w7' },
                            { value: 'w8', label: 'w8' },
                            { value: 'w9', label: 'w9' },
                            { value: 'w10', label: 'w10' },
                            { value: 'w11', label: 'w11' },
                            { value: 'w12', label: 'w12' },
                        ],
                    }),
                    buildField({
                        name: `${componentPath}.type`,
                        label: i18n.t('Type'),
                        valueType: 'LIST',
                        order: 3,
                        options: [
                            { value: 'TEI_FORM', label: 'TEI_FORM' },
                            { value: 'EVENT_TABLE', label: 'EVENT_TABLE' },
                            { value: 'EVENT_CARDS', label: 'EVENT_CARDS' },
                        ],
                    }),
                    buildField({
                        name: `${componentPath}.details.pageSize`,
                        label: i18n.t('Page size'),
                        valueType: 'INTEGER_POSITIVE',
                        order: 4,
                        visible: isEventComponent,
                    }),
                    buildField({
                        name: `${componentPath}.details.programStage`,
                        label: i18n.t('Program stage'),
                        valueType: 'LIST',
                        order: 5,
                        visible: isEventComponent,
                        options: programStages?.map(stage => ({ value: stage.id, label: stage.label })) ?? [],
                    }),
                ],
            };
        }),
    ];
};
