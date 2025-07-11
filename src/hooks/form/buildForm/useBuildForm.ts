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

const useBuildForm = ({ trackeValues }: { trackeValues?: any }) => {
    const { useQuery } = useUrlParams();
    const module = useQuery().get("module");
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)
    const { buildStudentProgramForm } = useBuildStudentProgramForm()
    const { buildStudentGeneralForm } = useBuildStudentGeneralForm()
    const { buildStudentEnrollmentForm } = useBuildStudentEnrollmentForm()
    const { buildStudentSocioForm } = useBuildStudentSocioForm()
    const { getProgram, data, loading } = useProgramConfig()

    useEffect(() => {
        //FETCH PROGRAM DATA BASED ON SELECTED ONE ON THE FORM
        if (trackeValues?.program) {
            getProgram(trackeValues.program)
        }
    }, [trackeValues?.program])

    const { programs, loading: loadingPrograms } = useGetPrograms()

    const buildForm = () => {
        switch (module) {
            case "registration":
                const programFields = buildStudentProgramForm({ dataStoreConfig: dataStoreConfig, programs, loading })
                const fieldsEnrollment = data ? buildStudentEnrollmentForm(
                    {
                        dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                    },
                    getDataElements(data?.programStages, trackeValues?.programStageRegistration)) : []
                const defaultFields = (trackeValues?.academicYear && data) ? buildStudentGeneralForm(
                    {
                        dataStoreConfig: dataStoreConfig,
                        programStages: data?.programStages ?? []
                    },
                    getOptions(getDataElements(data?.programStages, trackeValues?.programStageRegistration), trackeValues?.academicYear),
                    data?.programTrackedEntityAttributes ?? []
                ) : []
                const socioFields = data ? buildStudentSocioForm({
                    dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                }) : []
                const sectionFormEnrollment = formStudentEnrollmentForm({ programFields, socioFields, registrationFields: fieldsEnrollment, defaultFields, requiredData: { ...trackeValues, data } })
                return sectionFormEnrollment;

            // case "attendance":
            //     const fields = buildStudentEnrollmentForm({ dataStoreConfig: dataStoreConfig2, programStages: data?.programStages ?? [], dataElemnts: [] })
            //     const sectionForm = formStudentEnrollmentForm({ programFields: [], registrationFields: fields, defaultFields: [] })
            //     return sectionForm;

            default: break;
        }
    }
    return { buildForm, loading: loadingPrograms }
}

export { useBuildForm }