import { useUrlParams } from "dhis2-semis-functions"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"

function useBuildAttendanceClassConfigForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType

    const buildAttendanceClassConfigForm = ({ dataStoreConfig, programStages, programs }: any, dataElements: any) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []
        const attendace: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "attendance" })
        const { attendanceClassConfig } = attendace

        for (const element in attendanceClassConfig) {
            const configuratioKey: any = attendanceClassConfig?.[element as keyof DataStoreConfigType["attendance"]]
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
                                options: configuratioKey?.resource == "programStages" ?
                                    programStages?.map((prog: any) =>
                                        ({ value: prog.id, label: prog.displayName })) :
                                    configuratioKey?.resource === "programs" ?
                                        programs?.map((prog: any) =>
                                            ({ value: prog.id, label: prog.displayName })) :
                                        dataElements?.map((dx: any) => ({ value: dx?.dataElement?.id, label: dx?.dataElement?.displayName }))
                            }
                        }
                    }
                )
            }
        }

        const sortedFields = formFieldsList?.sort((a, b) => a.order - b.order)
        return sortedFields
    }

    return { buildAttendanceClassConfigForm }
}

export { useBuildAttendanceClassConfigForm }