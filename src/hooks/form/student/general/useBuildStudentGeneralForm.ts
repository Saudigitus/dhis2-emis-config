import { CustomAttributeProps } from "dhis2-semis-types"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { SectionType } from "../../../../types/variables/Variables"
import { useUrlParams } from "dhis2-semis-functions"

function useBuildStudentGeneralForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery().get("section") as SectionType



    const buildStudentGeneralForm = ({ dataStoreConfig, programStages, dataElements }: any) => {
        const formFieldsList: CustomAttributeProps[] = []
        const defaults: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "defaults" })

        for (const element in defaults) {

            const configuratioKey: any = defaults?.[element as keyof DataStoreConfigType["defaults"]]


            if (configuratioKey) {
                formFieldsList.push(
                    {
                        id: element,
                        name: element,
                        visible: true,
                        required: true,
                        disabled: false,
                        type: configuratioKey?.inputType,
                        labelName: configuratioKey?.label,
                        description: configuratioKey?.hint,
                        content: configuratioKey?.hint,
                        valueType: configuratioKey?.inputType,
                        displayName: configuratioKey?.label,
                        header: configuratioKey?.label,
                        // onChange: (value: any) => { },
                        options: {
                            optionSet: {
                                id: element,
                                options: []
                                // configuratioKey?.resource == "programStages" ? programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
                                //     : dataElements
                                //         .filter((dx: any) => dx.optionSetValue === foundStatus.optionSetValue && dx.valueType === foundStatus.valueType)
                                //         .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                            }
                        }
                    }
                )
            }

        }


        return formFieldsList
    }

    return { buildStudentGeneralForm }
}

export { useBuildStudentGeneralForm }