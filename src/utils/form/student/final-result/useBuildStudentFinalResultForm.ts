import { GroupFormProps } from "dhis2-semis-types";

type formStudentFinalResultFormType = {
    programFields: GroupFormProps["fields"],
    // defaultFields: GroupFormProps["fields"],
    finalResultFields: GroupFormProps["fields"],
}

function formStudentFinalResultForm({ finalResultFields, programFields }: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: "",
            name: "Program Details",
            fields: [...programFields]
        },
        {
            visible: true,
            // description: requiredData.data ? "" : "Select a program to follow and config the registration details",
            name: "Final Result Details",
            fields: [...finalResultFields]
        }
    ];
}

export { formStudentFinalResultForm };