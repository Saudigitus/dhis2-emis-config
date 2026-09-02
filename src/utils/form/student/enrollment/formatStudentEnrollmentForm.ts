import { D2I18n, GroupFormProps } from "dhis2-semis-types";

type formStudentEnrollmentFormType = {
    programFields: GroupFormProps["fields"],
    defaultFields: GroupFormProps["fields"],
    registrationFields: GroupFormProps["fields"],
    socioFields: GroupFormProps["fields"],
    requiredData?: any
    i18n: D2I18n
}

function formStudentEnrollmentForm({ programFields, registrationFields, defaultFields, requiredData, socioFields,i18n }: formStudentEnrollmentFormType) {
    return [
        {
            visible: true,
            description: "",
            name: i18n.t("Program Details"),
            fields: [...programFields]
        },
        ...(registrationFields.length > 0 ? [{
            visible: true,
            description: requiredData.data ? "" : "Select a program to follow and config the registration details",
            name: i18n.t("Registration Details"),
            fields: [...registrationFields]
        }] : []),
        ...(socioFields.length > 0 ? [{
            visible: true,
            description: requiredData.data ? i18n.t("If you don't use socio-economic module, please leave this field blanck") : i18n.t("Select a program to follow and config the socio economic details"),
            name: i18n.t("Socio Economic Details"),
            fields: [...socioFields]
        }] : []),
        ...(registrationFields.length > 0 ? [{
            visible: true,
            description: requiredData.data ? "" : i18n.t("Select a program to follow and config the registration details"),
            name: i18n.t("Default Configurations"),
            fields: [...defaultFields]
        }] : [])
    ];
}

export { formStudentEnrollmentForm };