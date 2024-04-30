import { type CustomAttributeProps } from "../../types/table/AttributeColumns"
import { getDataStoreElement } from "../../utils/functions"

interface FormFieldProps {
    programStages: any[]
    dataStoreConfigs: any[]
    dataElements: any[]
    getDataElements: (programStageId: string) => void
}

export default function useGetAttendanceFormFields() {
    const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
        if (getDataElements !== undefined && getDataElements !== null) {
            getDataElements(value.value)
        }
    }

    const getFormFields = ({ programStages, dataElements, getDataElements, dataStoreConfigs }: FormFieldProps) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.programStage
        const foundAbsenceReason = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.absenceReason
        const foundStatus = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.status
        const type =  getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.type
        const presentCode =  getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.code
        const lateCode =  getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.icon
        const leaveCode =  getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.color

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

        if (foundAbsenceReason !== undefined) {
            formFieldsList.push(
                {
                    id: "absenceReason",
                    displayName: foundAbsenceReason.label,
                    header: foundAbsenceReason.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundAbsenceReason.label,
                    description: foundAbsenceReason.hint,
                    valueType: foundAbsenceReason.inputType,
                    name: "absenceReason",
                    options: {
                        optionSet: {
                            id: 'absenceReason',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === foundAbsenceReason.optionSetValue && dx.valueType === foundAbsenceReason.valueType)
                                .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }
// console.log(foundStatus);
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

        if (type !== undefined) {
            formFieldsList.push(
                {
                    id: "status",
                    displayName: type.label,
                    header: type.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: type.label,
                    description: type.hint,
                    valueType: type.inputType,
                    name: "status",
                    options: {
                        optionSet: {
                            id: 'status',
                            options: type.options
                        }
                    }
                }
            )
        }

        if (presentCode !== undefined) {
            formFieldsList.push(
                {
                    id: "status",
                    displayName: presentCode.label,
                    header: presentCode.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: presentCode.label,
                    description: presentCode.hint,
                    valueType: presentCode.inputType,
                    name: "status",
                    options: {
                        optionSet: {
                            id: 'status',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === presentCode.optionSetValue && dx.valueType === presentCode.valueType)
                                .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (lateCode !== undefined) {
            formFieldsList.push(
                {
                    id: "status",
                    displayName: lateCode.label,
                    header: lateCode.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: lateCode.label,
                    description: lateCode.hint,
                    valueType: lateCode.inputType,
                    name: "status",
                    options: {
                        optionSet: {
                            id: 'status',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === lateCode.optionSetValue && dx.valueType === lateCode.valueType)
                                .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (leaveCode !== undefined) {
            formFieldsList.push(
                {
                    id: "status",
                    displayName: leaveCode.label,
                    header: leaveCode.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: leaveCode.label,
                    description: leaveCode.hint,
                    valueType: leaveCode.inputType,
                    name: "status",
                    options: {
                        optionSet: {
                            id: 'status',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === leaveCode.optionSetValue && dx.valueType === leaveCode.valueType)
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
