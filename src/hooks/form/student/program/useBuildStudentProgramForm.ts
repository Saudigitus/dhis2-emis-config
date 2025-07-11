import { useUrlParams } from "dhis2-semis-functions"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"

type buildStudentProgramFormType = {
    programs: any[]
    dataStoreConfig: DataStoreConfigType[] | any
    loading?: boolean
}

function useBuildStudentProgramForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery().get("section") as SectionType

    const buildStudentProgramForm = ({ dataStoreConfig, programs = [], loading = false }: buildStudentProgramFormType) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []
        const program: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "program" })

        for (const element in program) {

            const configuratioKey: any = program?.[element as keyof DataStoreConfigType["program"]]

            if (configuratioKey) {
                formFieldsList.push(
                    {
                        id: element,
                        name: element,
                        visible: true,
                        required: true,
                        disabled: loading,
                        order: configuratioKey?.order,
                        type: configuratioKey?.inputType,
                        labelName: configuratioKey?.label,
                        description: configuratioKey?.hint,
                        content: configuratioKey?.hint,
                        valueType: configuratioKey?.inputType,
                        displayName: configuratioKey?.label,
                        header: configuratioKey?.label,
                        options: {
                            optionSet: {
                                id: element,
                                options: programs?.map((program) => ({ value: program.id, label: program.displayName }))
                            }
                        }
                    }
                )
            }

        }
        return formFieldsList
    }
    return { buildStudentProgramForm }
}
export { useBuildStudentProgramForm }