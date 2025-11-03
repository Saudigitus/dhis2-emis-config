import { D2I18n, GroupFormProps } from "dhis2-semis-types";

type formStudentFinalResultFormType = {
    programFields: GroupFormProps["fields"],
    performanceFields: GroupFormProps["fields"],
    i18n: D2I18n
}

function formmStudentPerformance({ performanceFields, programFields,i18n }: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: "",
            name: i18n.t("Program Details"),
            fields: [...programFields]
        },
        ...(performanceFields.length > 0 ? [{
            visible: true,
            name: i18n.t('Performance details'),
            fields: [...performanceFields]
        }] : [])
    ];
}

export { formmStudentPerformance };