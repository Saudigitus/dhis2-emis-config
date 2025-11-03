import { D2I18n, GroupFormProps } from "dhis2-semis-types";

type formStudentFinalResultFormType = {
    programFields: GroupFormProps["fields"],
    attendanceDetails: GroupFormProps["fields"],
    attendanceStatusDetails: GroupFormProps["fields"]
    i18n: D2I18n
}

function formStudentAttendance({ attendanceDetails, programFields, attendanceStatusDetails,i18n }: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: "",
            name: i18n.t("Program Details"),
            fields: [...programFields]
        },
        ...(attendanceDetails?.length > 0 ? [{
            visible: true,
            name: i18n.t('Attendance General Details'),
            fields: [...attendanceDetails]
        }] : []),
        ...(attendanceStatusDetails?.length > 0 ? [{
            visible: true,
            name: i18n.t('Attendance Statuses Details'),
            fields: [...attendanceStatusDetails]
        }] : [])
    ];
}

export { formStudentAttendance };