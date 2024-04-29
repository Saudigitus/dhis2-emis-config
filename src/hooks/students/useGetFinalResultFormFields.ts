import { type CustomAttributeProps } from "../../types/table/AttributeColumns"
import { getDataStoreElement } from "../../utils/functions"

interface FormFieldProps {
    programStages: any[]
    dataStoreConfigs: any[]
    dataElements: any[]
    getDataElements: (programStageId: string) => void
}

export default function useGetFinalResultFormFields() {
    const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
        if (getDataElements !== undefined && getDataElements !== null) {
            getDataElements(value.value)
        }
    }

    const getFormFields = ({ programStages, dataElements, getDataElements, dataStoreConfigs }: FormFieldProps) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "final-result" })?.programStage
        const foundStatus = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "final-result" })?.status

        if (foundProgramStage !== undefined) {
            formFieldsList.push(
                {
                    visible: true,
                    disabled: false,
                    labelName: foundProgramStage.label,
                    description: foundProgramStage.hint,
                    valueType: foundProgramStage.inputType,
                    id: "programStage",
                    displayName: foundProgramStage.label,
                    header: foundProgramStage.label,
                    name: "programStage",
                    required: true,
                    onChange: (value: any) => { onProgramStageSelected(value, getDataElements) },
                    options: {
                        optionSet: {
                            id: 'programStage',
                            options: programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
                        }
                    }
                }
            )
        }

        if (foundStatus !== undefined) {
            formFieldsList.push(
                {
                    id: "status",
                    displayName: foundStatus.label,
                    header: foundStatus.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundStatus.label,
                    description: foundStatus.hint,
                    valueType: foundStatus.inputType,
                    name: "status",
                    options: {
                        optionSet: {
                            id: 'status',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === foundStatus.optionSetValue && dx.valueType === foundStatus.valueType)
                                .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        return formFieldsList
    }
    return { getFormFields }
}
