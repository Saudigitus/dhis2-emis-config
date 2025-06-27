import { useUrlParams } from "dhis2-semis-functions"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"

type buildStudentProgramFormType = {
    programs: any[]
    dataStoreConfig: DataStoreConfigType[]
}

function useBuildStudentProgramForm() {
    const { useQuery, add } = useUrlParams()
    const section = useQuery().get("section") as SectionType


    // const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
    //     if (getDataElements !== undefined && getDataElements !== null) {
    //         getDataElements(value.value)
    //     }
    // }

    const buildStudentProgramForm = ({ dataStoreConfig, programs = [] }: buildStudentProgramFormType) => {
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
                        disabled: false,
                        order: configuratioKey?.order,
                        type: configuratioKey?.inputType,
                        labelName: configuratioKey?.label,
                        description: configuratioKey?.hint,
                        content: configuratioKey?.hint,
                        valueType: configuratioKey?.inputType,
                        displayName: configuratioKey?.label,
                        header: configuratioKey?.label,
                        onChange: (value: any) => { add("program",value?.value) },
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