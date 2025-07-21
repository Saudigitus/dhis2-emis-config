import { useUrlParams } from "dhis2-semis-functions"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"

function useBuildStudentEnrollmentForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType

    const buildStudentEnrollmentForm = ({ dataStoreConfig, programStages }: any, dataElements: any) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []
        const registration: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "registration" })

        for (const element in registration) {
            const configuratioKey: any = registration?.[element as keyof DataStoreConfigType["registration"]]

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
                        options: {
                            optionSet: {
                                id: element,
                                options: configuratioKey?.resource == "programStages" ?
                                    programStages?.map((prog: any) =>
                                        ({ value: prog.id, label: prog.displayName })) : dataElements
                                            ?.map((dx: any) => ({ value: dx?.dataElement?.id, label: dx?.dataElement?.displayName }))
                            }
                        }
                    }
                )
            }
        }

        const sortedFields = formFieldsList?.sort((a, b) => a.order - b.order)
        return sortedFields
    }

    return { buildStudentEnrollmentForm }
}
export { useBuildStudentEnrollmentForm }