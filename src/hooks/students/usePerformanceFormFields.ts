import { type CustomAttributeProps } from "../../types/table/AttributeColumns"
import { getDataStoreElement } from "../../utils/functions"

interface FormFieldProps {
    dataStoreConfigs: any[]
    programStages: any[]
}

export default function usePerformanceFormFields() {
    const getFormFields = ({ dataStoreConfigs, programStages }: FormFieldProps) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "performance" })?.programStages

        if (foundProgramStage !== undefined) {
            formFieldsList.push(
                {
                    id: "programStages",
                    header: foundProgramStage.label,
                    displayName: foundProgramStage.label,
                    required: true,
                    multiple: true,
                    visible: true,
                    disabled: false,
                    labelName: foundProgramStage.label,
                    description: foundProgramStage.hint,
                    valueType: foundProgramStage.inputType,
                    name: "programStages",
                    options: {
                        optionSet: {
                            id: 'programStages',
                            options: programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
                        }
                    }
                }
            )
        }

        return formFieldsList
    }

    return { getFormFields }
}
