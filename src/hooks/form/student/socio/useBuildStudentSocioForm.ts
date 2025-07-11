import { useUrlParams } from "dhis2-semis-functions"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"

function useBuildStudentSocioForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery().get("section") as SectionType


    const buildStudentSocioForm = ({ dataStoreConfig, programStages }: any) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []
        const socioEconomic: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "socio-economics" })
        for (const element in socioEconomic) {
            const configuratioKey: any = socioEconomic?.[element as keyof DataStoreConfigType["socio-economics"]]
            if (configuratioKey) {
                formFieldsList.push(
                    {
                        id: element,
                        name: element,
                        visible: true,
                        required: false,
                        disabled: false,
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
                                options: configuratioKey?.resource == "programStages" ?
                                    programStages?.map((prog: any) =>
                                        ({ value: prog.id, label: prog.displayName })) : []
                            }
                        }
                    }
                )
            }
        }

        const sortedFields = formFieldsList?.sort((a, b) => a.order - b.order)
        return sortedFields
    }

    return { buildStudentSocioForm }
}

export { useBuildStudentSocioForm }