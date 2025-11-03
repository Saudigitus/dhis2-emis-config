import { D2I18n, GroupFormProps } from "dhis2-semis-types";

type formStudentTransferFormType = {
    programFields: GroupFormProps["fields"],
    transferFields: GroupFormProps["fields"],
    transferStatusFields: GroupFormProps["fields"],
    i18n: D2I18n
}

function formStudentTransferForm({ transferFields, programFields, transferStatusFields,i18n }: formStudentTransferFormType) {
    return [
        {
            visible: true,
            description: "",
            name: i18n.t("Program Details"),
            fields: [...programFields]
        },
        ...(transferFields?.length > 0 ? [{
            visible: true,
            description: "",
            name: i18n.t("Transfer Details"),
            fields: [...transferFields]
        }] : []),
        ...(transferStatusFields?.length > 0 ? [{
            visible: Boolean(transferStatusFields?.length),
            description: "",
            name: i18n.t("Transfer Status Details"),
            fields: [...transferStatusFields]
        }] : []),
    ];
}

export { formStudentTransferForm };