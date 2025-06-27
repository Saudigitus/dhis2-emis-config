import { useRecoilValue } from "recoil"
import { useUrlParams } from "dhis2-semis-functions"
import { useBuildStudentEnrollmentForm } from "../index"
import { formStudentEnrollmentForm } from "../../../utils/form"
import { DataStoreConfigState } from "../../../atoms/DataStoreSchema"
import dataStoreConfig2 from "../../../utils/constants/form/configFormFields2.json"


const useBuildForm = () => {
    const { useQuery } = useUrlParams();
    const name = useQuery().get("name");
    const module = useQuery().get("module");
    const section = useQuery().get("section");
    const dataStoreConfig = useRecoilValue(DataStoreConfigState)
    const { buildStudentEnrollmentForm } = useBuildStudentEnrollmentForm()


    const buildForm = () => {
        switch (module) {
            case "registration":
                const fields = buildStudentEnrollmentForm({ dataStoreConfig: dataStoreConfig2, programStages: [], dataElemnts: [] })
                const sectionForm = formStudentEnrollmentForm({ programFields: [], registrationFields: fields, defaultFields: [] })
                return sectionForm;

            default:
                break;
        }

    }

    return { buildForm }
}

export { useBuildForm }