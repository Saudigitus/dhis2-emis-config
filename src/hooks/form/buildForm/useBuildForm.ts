import { useRecoilValue } from "recoil"
import { useUrlParams } from "dhis2-semis-functions"
import useGetPrograms from "../../program/useGetPrograms"
import { formStudentEnrollmentForm } from "../../../utils/form"
import { DataStoreConfigState } from "../../../atoms/DataStoreSchema"
import useProgramConfig from "../../../hooks/program/useGetProgram"
import { useBuildStudentEnrollmentForm, useBuildStudentGeneralForm, useBuildStudentProgramForm } from "../index"
import { useEffect } from "react"

const getDataElements = (programStages: any[], programStage: string) => {
    const dataElements = programStages?.filter((programStag) => {
        return programStag.id === programStage
    })?.[0]?.programStageDataElements
    return dataElements
}

export const getOptions = (dataElemnts: any[], dataElement: string) => {
    const found = dataElemnts?.find((item: any) => item.dataElement.id === dataElement);
    return found?.dataElement?.optionSet?.options || [];
}

const useBuildForm = ({ trackeValues }: { trackeValues?: any }) => {
    const { useQuery } = useUrlParams();
    const module = useQuery().get("module");
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)
    const { buildStudentProgramForm } = useBuildStudentProgramForm()
    const { buildStudentGeneralForm } = useBuildStudentGeneralForm()
    const { buildStudentEnrollmentForm } = useBuildStudentEnrollmentForm()
    const { getProgram, data } = useProgramConfig()

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
                const programFields = buildStudentProgramForm({ dataStoreConfig: dataStoreConfig, programs })
                const fieldsEnrollment = data ? buildStudentEnrollmentForm(
                    {
                        dataStoreConfig: dataStoreConfig, programStages: data?.programStages ?? []
                    },
                    getDataElements(data?.programStages, trackeValues?.programStage)) : []
                const defaultFields = trackeValues?.academicYear ? buildStudentGeneralForm(
                    {
                        dataStoreConfig: dataStoreConfig,
                        programStages: data?.programStages ?? []
                    },
                    getOptions(getDataElements(data?.programStages, trackeValues?.programStage), trackeValues?.academicYear),
                    data?.programTrackedEntityAttributes ?? []
                ) : []
                const sectionFormEnrollment = formStudentEnrollmentForm({ programFields, registrationFields: fieldsEnrollment, defaultFields, requiredData: { ...trackeValues, data: data ?? null } })
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