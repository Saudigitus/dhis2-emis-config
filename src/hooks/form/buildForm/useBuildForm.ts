import { useRecoilValue } from "recoil"
import { useUrlParams } from "dhis2-semis-functions"
import useGetPrograms from "../../program/useGetPrograms"
import { formStudentEnrollmentForm } from "../../../utils/form"
import { DataStoreConfigState } from "../../../atoms/DataStoreSchema"
import useProgramConfig from "../../../hooks/program/useGetProgram"
import { useBuildStudentEnrollmentForm, useBuildStudentGeneralForm, useBuildStudentProgramForm } from "../index"
import { useEffect } from "react"
import { getDataElements, getOptions } from "../../../utils/dataStore/common"
import { useBuildStudentSocioForm } from "../student/socio/useBuildStudentSocioForm"
import { useBuildStudentFinalResultForm } from "../student/final-result/useBuildStudentFinalResultForm"
import { formStudentFinalResultForm } from "../../../utils/form/student/final-result/useBuildStudentFinalResultForm"
import { useBuildStudentTransferForm } from "../student/transfer/useBuildStudentTransferForm"
import { formStudentTransferForm } from "../../../utils/form/student/transfer/useBuildStudentTransferForm"
import { getDataStoreConfigKeys } from "../../../utils/dataStore/dataStoreConfigKeys"
import { SectionType } from "../../../types/variables/Variables"
import { useBuildStudentAttendanceForm } from "../student/attendance/useBuildStudentAttendanceForm"
import { formStudentAttendance } from "../../../utils/form/student/attendance/useBuildStudentAttendanceForm"
import { useBuildStudentPerformanceForm } from "../student/performance/useBuildStudentPerformanceForm"
import { formmStudentPerformance } from "../../../utils/form/student/performance/useBuildStudentAttendanceForm"

const useBuildForm = ({ trackeValues }: { trackeValues?: any }) => {
    const { useQuery } = useUrlParams();
    const module = useQuery.get("module");
    const section = useQuery.get("section") as SectionType;
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)
    const { buildStudentProgramForm } = useBuildStudentProgramForm()
    const { buildStudentGeneralForm } = useBuildStudentGeneralForm()
    const { buildStudentEnrollmentForm } = useBuildStudentEnrollmentForm()
    const { buildStudentSocioForm } = useBuildStudentSocioForm()
    const { buildStudentFinalResultForm } = useBuildStudentFinalResultForm()
    const { buildStudentAttendanceForm } = useBuildStudentAttendanceForm()
    const { getProgram, data, loading } = useProgramConfig()
    const { buildStudentTransferForm } = useBuildStudentTransferForm()
    const { buildStudentPerformanceForm } = useBuildStudentPerformanceForm()

    useEffect(() => {
        //FETCH PROGRAM DATA BASED ON SELECTED ONE ON THE FORM
        if (trackeValues?.program) {
            getProgram(trackeValues.program)
        }
    }, [trackeValues?.program])

    const { programs, loading: loadingPrograms } = useGetPrograms()

    const buildForm = () => {
        const programFields = buildStudentProgramForm({ dataStoreConfig: dataStoreConfig, programs, loading })
        switch (module) {
            case "registration":
                const defaults: any = getDataStoreConfigKeys({
                    dataStoreConfig: dataStoreConfig,
                    sectionType: section,
                    element: "defaults"
                })

                const fieldsEnrollment = data ? buildStudentEnrollmentForm(
                    {
                        dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                    },
                    getDataElements(data?.programStages, trackeValues?.programStageRegistration)) : []

                const defaultFields = (trackeValues?.academicYear && data) ? buildStudentGeneralForm(
                    getOptions(getDataElements(data?.programStages, trackeValues?.programStageAttendance), trackeValues?.academicYear),
                    data?.programTrackedEntityAttributes ?? [],
                    defaults
                ) : []

                const socioFields = data ? buildStudentSocioForm({
                    dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                }) : []

                const sectionFormEnrollment = formStudentEnrollmentForm({ programFields, socioFields, registrationFields: fieldsEnrollment, defaultFields, requiredData: { ...trackeValues, data } })
                return sectionFormEnrollment;

            case "final-result":
                const fields = data ? buildStudentFinalResultForm(
                    {
                        dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                    },
                    getDataElements(data?.programStages, trackeValues?.programStageFinalResult)) : []

                const sectionForm = formStudentFinalResultForm({ finalResultFields: fields, programFields: programFields })
                return sectionForm;

            case 'attendance':
                const stageDataElements = getDataElements(data?.programStages, trackeValues?.programStageAttendance)
                const { attendanceStatus }: any = getDataStoreConfigKeys({
                    dataStoreConfig: dataStoreConfig,
                    sectionType: section,
                    element: "attendance"
                })

                const attendace = data ? buildStudentAttendanceForm({
                    dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                },
                    stageDataElements) : []

                const attendanceStatusDetails = (trackeValues?.status && data) ? buildStudentGeneralForm(
                    getOptions(stageDataElements, trackeValues?.status),
                    stageDataElements ?? [],
                    attendanceStatus
                ) : []

                const theForm = formStudentAttendance({ attendanceDetails: attendace, programFields: programFields, attendanceStatusDetails })
                return theForm;

            case "transfer":
                const transfer: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "transfer" })
                const { transferStatus: transferStatusFieldsConfig } = transfer

                console.log(transfer)

                const transferStatusFields = (trackeValues?.status && data) ?
                    buildStudentGeneralForm(
                        getOptions(getDataElements(data?.programStages, trackeValues?.programStageTransfer), trackeValues?.status),
                        data?.programTrackedEntityAttributes ?? [],
                        transferStatusFieldsConfig
                    ) : []

                const transferFields = data
                    ? buildStudentTransferForm({
                        formValues: trackeValues,
                        dataStoreConfig: dataStoreConfig,
                        programStages: data?.programStages ?? [],
                    })
                    : []
                const sectionFormTransfer = formStudentTransferForm({ transferFields, programFields, transferStatusFields })
                return sectionFormTransfer;

            case "performance":
                const performanceFields = data ? buildStudentPerformanceForm(
                    {
                        dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                    },
                    getDataElements(data?.programStages, trackeValues?.programStagePerformance)) : []

                const performanceForm = formmStudentPerformance({ performanceFields, programFields })

                return performanceForm
            default: break;
        }
    }
    return { buildForm, loading: loadingPrograms }
}

export { useBuildForm }