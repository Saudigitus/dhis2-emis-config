import { useBuildForm } from "./buildForm/useBuildForm";
import { useBuildStudentTransferForm } from "./student/transfer/useBuildStudentTransferForm";
import { useBuildStaffTransferForm } from "./staff/transfer/useBuildStaffTransferForm";
import { useBuildStaffGeneralForm } from "./staff/general/useBuildStaffGeneralForm";
import { useBuildStaffEnrollmentForm } from "./staff/enrollment/useBuildStaffEnrollmentForm";
import { useBuildStaffAttendanceForm } from "./staff/attendance/useBuildStaffAttendanceForm";
import { useBuildStudentEnrollmentForm } from "./student/enrollment/useBuildStudentEnrollmentForm";
import { useBuildStudentGeneralForm } from "./student/general/useBuildStudentGeneralForm";
import { useBuildStudentAttendanceForm } from "./student/attendance/useBuildStudentAttendanceForm";
import { useBuildStudentFinalResultForm } from "./student/final-result/useBuildStudentFinalResultForm";
import { useBuildStudentSocioForm } from "./student/socio/useBuildStudentSocioForm";
import { useBuildStudentProgramForm } from "./student/program/useBuildStudentProgramForm";

export {
    useBuildForm, useBuildStaffAttendanceForm, useBuildStudentEnrollmentForm, useBuildStudentProgramForm,
    useBuildStudentGeneralForm,
}