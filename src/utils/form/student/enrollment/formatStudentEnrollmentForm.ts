import { GroupFormProps } from "dhis2-semis-types";

type formStudentEnrollmentFormType = {
    programFields: GroupFormProps["fields"],
    defaultFields: GroupFormProps["fields"],
    registrationFields: GroupFormProps["fields"],
    requiredData?: any
}

function formStudentEnrollmentForm({ programFields, registrationFields, defaultFields, requiredData }: formStudentEnrollmentFormType) {
    console.log(requiredData,"dsd");
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
            description: (!requiredData?.academicYear || !requiredData.data) ? "Select an academic year to follow and config the default details" : "",
            name: "Default Configurations",
            fields: [...defaultFields]
        }
    ];
}

export { formStudentEnrollmentForm };