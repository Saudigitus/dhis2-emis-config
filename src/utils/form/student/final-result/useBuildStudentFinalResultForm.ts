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
        ...(finalResultFields.length > 0 ? [{
            visible: true,
            name: "Final Result Details",
            fields: [...finalResultFields]
        }] : [])
    ];
}

export { formStudentFinalResultForm };