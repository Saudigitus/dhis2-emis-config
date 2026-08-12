import { useUrlParams } from "dhis2-semis-functions"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { useDataStoreKey, useProgramsKeys } from "dhis2-semis-components"

function useBuildStudentProfileForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType
    const programs = useProgramsKeys()
    const { program, "final-result": finalResult } = useDataStoreKey({ sectionType: section ?? "" }) ?? [];
    const sectionProgram: any = programs?.find(x => x.id == program)

    const buildFields = (config: Record<string, any>): ConfigCustomAttributeProps[] => {
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
                            sectionProgram?.programIndicators?.map((prog: any) => ({ value: prog.id, label: prog.displayName })) :
                            configuration?.resource == "performanceOptionSets" ?
                                sectionProgram?.programStages?.find((x: any) => x.id == finalResult?.programStage)?.
                                    programStageDataElements?.find((x: any) => x?.dataElement?.id == finalResult?.status)?.
                                    dataElement?.optionSet?.options?.map((opt: any) => ({ value: opt.value, label: opt.label }))
                                : []
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