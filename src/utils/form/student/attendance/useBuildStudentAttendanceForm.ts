import { GroupFormProps } from "dhis2-semis-types";

type formStudentFinalResultFormType = {
    programFields: GroupFormProps["fields"],
    attendanceDetails: GroupFormProps["fields"],
    attendanceStatusDetails: GroupFormProps["fields"]
}

function formStudentAttendance({ attendanceDetails, programFields, attendanceStatusDetails }: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: "",
            name: "Program Details",
            fields: [...programFields]
        },
        {
            visible: true,
            name: 'Attendance General Details',
            fields: [...attendanceDetails]
        },
        ...(attendanceStatusDetails.length > 0 ? [{
            visible: true,
            name: 'Attendance Statuses Details',
            fields: [...attendanceStatusDetails]
        }] : [])
    ];
}

export { formStudentAttendance };