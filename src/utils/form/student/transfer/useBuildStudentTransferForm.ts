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
        {
            visible: true,
            description: "",
            name: "Transfer Details",
            fields: [...transferFields]
        },
         {
             visible: Boolean(transferStatusFields?.length),
             description: "",
             name: "Transfer Status Details",
            fields: [...transferStatusFields]
        }
    ];
}

export { formStudentTransferForm };