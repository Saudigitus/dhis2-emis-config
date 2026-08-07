import { D2I18n, GroupFormProps } from "dhis2-semis-types";

type formStudentFinalResultFormType = {
    programFields: GroupFormProps["fields"],
    profileFields: GroupFormProps["fields"],
    i18n: D2I18n
}

function formStudentProfile({ programFields, i18n,profileFields }: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: "",
            name: i18n.t("Program Details"),
            fields: [...programFields]
        },
        {
            visible: true,
            description: "",
            name: i18n.t("General Settings"),
            fields: [...profileFields]
        }
    ];
}

export { formStudentProfile };