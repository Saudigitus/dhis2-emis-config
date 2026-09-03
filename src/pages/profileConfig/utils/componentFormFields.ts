import { D2I18n } from 'dhis2-semis-types';
import { ProfileComponentType } from '../types';

type ProgramStageOption = { id: string; label: string };

const field = ({
    name,
    label,
    valueType,
    order,
    options,
    visible = true,
}: {
    name: string;
    label: string;
    valueType: string;
    order: number;
    options?: Array<{ value: string; label: string }>;
    visible?: boolean;
}) => ({
    id: name,
    name,
    visible,
    required: true,
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

const sizes = Array.from({ length: 12 }, (_, index) => {
    const value = `w${index + 1}`;
    return { value, label: value };
});

export const buildComponentFields = ({
    i18n,
    type,
    programStages,
    prefix = '',
}: {
    i18n: D2I18n;
    type?: ProfileComponentType;
    programStages: ProgramStageOption[];
    prefix?: string;
}) => {
    const name = (fieldName: string) => prefix ? `${prefix}.${fieldName}` : fieldName;
    const isEventComponent = type === 'EVENT_TABLE' || type === 'EVENT_CARDS';

    return [
        field({ name: name('displayName'), label: i18n.t('Display name'), valueType: 'TEXT', order: 0 }),
        field({ name: name('editable'), label: i18n.t('Editable'), valueType: 'BOOLEAN', order: 1 }),
        field({ name: name('size'), label: i18n.t('Size'), valueType: 'LIST', order: 2, options: sizes }),
        field({
            name: name('type'),
            label: i18n.t('Type'),
            valueType: 'LIST',
            order: 3,
            options: [
                { value: 'TEI_FORM', label: 'TEI_FORM' },
                { value: 'EVENT_TABLE', label: 'EVENT_TABLE' },
                { value: 'EVENT_CARDS', label: 'EVENT_CARDS' },
            ],
        }),
        field({
            name: name('details.pageSize'),
            label: i18n.t('Page size'),
            valueType: 'INTEGER_POSITIVE',
            order: 4,
            visible: isEventComponent,
        }),
        field({
            name: name('details.programStage'),
            label: i18n.t('Program stage'),
            valueType: 'LIST',
            order: 5,
            visible: isEventComponent,
            options: programStages?.map(stage => ({ value: stage?.id, label: stage?.label })) ?? [],
        }),
    ];
};
