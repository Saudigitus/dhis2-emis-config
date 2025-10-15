import { GroupFormProps } from "dhis2-semis-types";

type formStudentTransferFormType = {
    programFields: GroupFormProps["fields"],
    transferFields: GroupFormProps["fields"],
    transferStatusFields: GroupFormProps["fields"],
}

function formStudentTransferForm({ transferFields, programFields, transferStatusFields }: formStudentTransferFormType) {
    return [
        {
            visible: true,
            description: "",
            name: "Program Details",
            fields: [...programFields]
        },
        ...(transferFields?.length > 0 ? [{
            visible: true,
            description: "",
            name: "Transfer Details",
            fields: [...transferFields]
        }] : []),
        ...(transferStatusFields?.length > 0 ? [{
            visible: Boolean(transferStatusFields?.length),
            description: "",
            name: "Transfer Status Details",
            fields: [...transferStatusFields]
        }] : []),
    ];
}

export { formStudentTransferForm };