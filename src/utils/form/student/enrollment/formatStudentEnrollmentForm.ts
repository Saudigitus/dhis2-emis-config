import { GroupFormProps } from "dhis2-semis-types";

type formStudentEnrollmentFormType = {
    programFields: GroupFormProps["fields"],
    defaultFields: GroupFormProps["fields"],
    registrationFields: GroupFormProps["fields"],
    socioFields: GroupFormProps["fields"],
    requiredData?: any
}

function formStudentEnrollmentForm({ programFields, registrationFields, defaultFields, requiredData,socioFields }: formStudentEnrollmentFormType) {
    return [
        {
            visible: true,
            description: "",
            name: "Program Details",
            fields: [...programFields]
        },
        {
            visible: true,
            description: requiredData.data ? "" : "Select a program to follow and config the registration details",
            name: "Registration Details",
            fields: [...registrationFields]
        },
        {
            visible: true,
            description: requiredData.data ? "If you don't use socio-economic module, please leave this field blanc" : "Select a program to follow and config the socio economic details",
            name: "Socio Economic Details",
            fields: [...socioFields]
        },
        {
            visible: true,
            description: (!requiredData?.academicYear || !requiredData.data) ? "Select an academic year to follow and config the default details" : "",
            name: "Default Configurations",
            fields: [...defaultFields]
        }
    ];
}

export { formStudentEnrollmentForm };