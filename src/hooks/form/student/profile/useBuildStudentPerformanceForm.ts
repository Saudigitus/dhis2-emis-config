import { useUrlParams } from "dhis2-semis-functions"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"

function useBuildStudentProfileForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType

    const buildStudentProfileForm = ({ dataStoreConfig }: any) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []

        const { other } = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "profile" })

        for (const element in other) {
            const configuratioKey: any = other?.[element as keyof DataStoreConfigType["profile"]]
            console.log(configuratioKey)
            if (configuratioKey) {

                formFieldsList.push(
                    {
                        id: element,
                        name: element,
                        visible: true,
                        required: configuratioKey.required,
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
                                options: []
                            }
                        }
                    }
                )
            }
        }

        const sortedFields = formFieldsList?.sort((a, b) => a.order - b.order)
        return sortedFields
    }

    return { buildStudentProfileForm }
}

export { useBuildStudentProfileForm }