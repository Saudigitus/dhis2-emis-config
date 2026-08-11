import { useUrlParams } from "dhis2-semis-functions"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"

function useBuildStudentProfileForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType

    const buildFields = (config: Record<string, any>, program?: any): ConfigCustomAttributeProps[] => {
        return Object.entries(config)
            .filter(([, configuration]) => configuration)
            .map(([element, configuration]) => ({
                id: element,
                name: element,
                visible: true,
                required: configuration.required,
                disabled: false,
                order: configuration.order,
                type: configuration.inputType,
                labelName: configuration.label,
                description: configuration.hint,
                content: configuration.hint,
                valueType: configuration.inputType,
                displayName: configuration.label,
                header: configuration.label,
                options: {
                    optionSet: {
                        id: element,
                        options: configuration?.resource == "programIndicator" ?
                            program?.programIndicators?.map((prog: any) => ({ value: prog.id, label: prog.displayName })) : []
                    }
                }
            }))
            .sort((a, b) => a.order - b.order)
    }

    const buildStudentProfileForm = ({ dataStoreConfig }: any) => {
        const { other } = getDataStoreConfigKeys({
            dataStoreConfig,
            sectionType: section,
            element: "profile",
        })

        return buildFields(other)
    }

    return {
        buildStudentProfileForm
    }
}
export { useBuildStudentProfileForm }