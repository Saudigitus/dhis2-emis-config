import { GroupFormProps } from "dhis2-semis-types";

type formStudentEnrollmentFormType = {
    programFields: GroupFormProps["fields"],
    defaultFields: GroupFormProps["fields"],
    registrationFields: GroupFormProps["fields"],
}

function formStudentEnrollmentForm({ programFields, registrationFields, defaultFields }: formStudentEnrollmentFormType) {
    return [
        {
            visible: true,
            description: "",
            name: "Program Details",
            fields: [...programFields]
        },
        {
            visible: true,
            description: "",
            name: "Registration Details",
            fields: [...registrationFields]
        },
        {
            visible: true,
            description: "",
            name: "Default Configurations",
            fields: [...defaultFields]
        }
    ];
}

export { formStudentEnrollmentForm };