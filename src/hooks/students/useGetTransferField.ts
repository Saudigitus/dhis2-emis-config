import { type CustomAttributeProps } from "../../types/table/AttributeColumns"
import { getDataStoreElement } from "../../utils/functions"

interface FormFieldProps {
    programStages: any[]
    dataStoreConfigs: any[]
    dataElements: any[]
    getDataElements: (programStageId: string) => void
}

export default function useGetTransferField() {

    const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
        if (getDataElements !== undefined && getDataElements !== null) {
            getDataElements(value.value)
        }
    }

    const getFormFields = ({ dataStoreConfigs, programStages, dataElements, getDataElements }: FormFieldProps) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.programStage
        const foundDestinySchool = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.destinySchool
        const foundOriginSchool = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.originSchool
        const foundStatus = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.status
        const foundReason = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.reason

        if (foundProgramStage !== undefined && foundProgramStage !== null) {
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

        if (foundReason !== undefined && foundReason !== null) {
            formFieldsList.push(
                {
                    id: "reason",
                    displayName: foundReason.label,
                    header: foundReason.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundReason.label,
                    description: foundReason.hint,
                    valueType: foundReason.inputType,
                    name: "reason",
                    options: {
                        optionSet: {
                            id: 'reason',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === foundReason.optionSetValue && dx.valueType === foundReason.valueType)
                                .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (foundStatus !== undefined && foundStatus !== null) {
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

        if (foundOriginSchool !== null && foundOriginSchool !== undefined) {
            formFieldsList.push(
                {
                    id: "originSchool",
                    displayName: foundOriginSchool.label,
                    header: foundOriginSchool.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundOriginSchool.label,
                    description: foundOriginSchool.hint,
                    valueType: foundOriginSchool.inputType,
                    name: "originSchool",
                    options: {
                        optionSet: {
                            id: 'originSchool',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === foundOriginSchool.optionSetValue && dx.valueType === foundOriginSchool.valueType)
                                .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (foundDestinySchool !== undefined && foundDestinySchool !== null) {
            formFieldsList.push(
                {
                    id: "destinySchool",
                    displayName: foundDestinySchool.label,
                    header: foundDestinySchool.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundDestinySchool.label,
                    description: foundDestinySchool.hint,
                    valueType: foundDestinySchool.inputType,
                    name: "destinySchool",
                    options: {
                        optionSet: {
                            id: 'destinySchool',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === foundDestinySchool.optionSetValue && dx.valueType === foundDestinySchool.valueType)
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
