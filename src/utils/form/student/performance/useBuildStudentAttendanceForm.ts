import { GroupFormProps } from "dhis2-semis-types";

type formStudentFinalResultFormType = {
    programFields: GroupFormProps["fields"],
    performanceFields: GroupFormProps["fields"],
}

function formmStudentPerformance({ performanceFields, programFields }: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: "",
            name: "Program Details",
            fields: [...programFields]
        },
        ...(performanceFields.length > 0 ? [{
            visible: true,
            name: 'Performance details',
            fields: [...performanceFields]
        }] : [])
    ];
}

export { formmStudentPerformance };