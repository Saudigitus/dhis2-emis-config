import { useRecoilValue } from "recoil"
import { useUrlParams } from "dhis2-semis-functions"
import { formStudentEnrollmentForm } from "../../../utils/form"
import { DataStoreConfigState } from "../../../atoms/DataStoreSchema"
import dataStoreConfig2 from "../../../utils/constants/form/configFormFields2.json"
import { useBuildStudentEnrollmentForm, useBuildStudentGeneralForm, useBuildStudentProgramForm } from "../index"
import useGetPrograms from "../../program/useGetPrograms"


const useBuildForm = () => {
    const { useQuery } = useUrlParams();
    const name = useQuery().get("name");
    const module = useQuery().get("module");
    const section = useQuery().get("section");
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)
    const { buildStudentProgramForm } = useBuildStudentProgramForm()
    const { buildStudentGeneralForm } = useBuildStudentGeneralForm()
    const { buildStudentEnrollmentForm } = useBuildStudentEnrollmentForm()

    const { programs, loading: loadingPrograms } = useGetPrograms()


    console.log(programs)
    const buildForm = () => {
        switch (module) {
            case "registration":
                const fieldsEnrollment = buildStudentEnrollmentForm({ dataStoreConfig: dataStoreConfig2, programStages: [], dataElemnts: [] })
                const programFields = buildStudentProgramForm({ dataStoreConfig: dataStoreConfig2, programs })
                const defaultFields = buildStudentGeneralForm({ dataStoreConfig: dataStoreConfig2, programStages: [], dataElemnts: [] })

                const sectionFormEnrollment = formStudentEnrollmentForm({ programFields, registrationFields: fieldsEnrollment, defaultFields })
                return sectionFormEnrollment;

            case "attendance":
                const fields = buildStudentEnrollmentForm({ dataStoreConfig: dataStoreConfig2, programStages: [], dataElemnts: [] })
                const sectionForm = formStudentEnrollmentForm({ programFields: [], registrationFields: fields, defaultFields: [] })
                return sectionForm;

            default:
                break;
        }

    }

    return { buildForm, loading: loadingPrograms }
}

export { useBuildForm }