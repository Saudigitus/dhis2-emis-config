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
        const absentCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.absentCode
        const presentCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.presentCode
        const lateCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.lateCode
        const leaveCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "attendance" })?.leaveCode

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

        if (absentCode !== undefined) {
            formFieldsList.push(
                {
                    id: "absentCode",
                    displayName: absentCode.label,
                    header: absentCode.label,
                    required: false,
                    visible: true,
                    disabled: false,
                    labelName: absentCode.label,
                    description: absentCode.hint,
                    valueType: absentCode.inputType,
                    name: "absentCode",
                    options: {
                        optionSet: {
                            id: 'absentCode',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === absentCode.optionSetValue && dx.valueType === absentCode.valueType)
                                .flatMap((x: any) => x?.optionSet?.options) || []
                        }
                    }
                }
            )
        }

        if (presentCode !== undefined) {
            formFieldsList.push(
                {
                    id: "presentCode",
                    displayName: presentCode.label,
                    header: presentCode.label,
                    required: false,
                    visible: true,
                    disabled: false,
                    labelName: presentCode.label,
                    description: presentCode.hint,
                    valueType: presentCode.inputType,
                    name: "presentCode",
                    options: {
                        optionSet: {
                            id: 'presentCode',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === presentCode.optionSetValue && dx.valueType === presentCode.valueType)
                                .flatMap((x: any) => x?.optionSet?.options) || []
                        }
                    }
                }
            )
        }

        if (lateCode !== undefined) {
            formFieldsList.push(
                {
                    id: "lateCode",
                    displayName: lateCode.label,
                    header: lateCode.label,
                    required: false,
                    visible: true,
                    disabled: false,
                    labelName: lateCode.label,
                    description: lateCode.hint,
                    valueType: lateCode.inputType,
                    name: "lateCode",
                    options: {
                        optionSet: {
                            id: 'lateCode',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === lateCode.optionSetValue && dx.valueType === lateCode.valueType)
                                .flatMap((x: any) => x?.optionSet?.options) || []
                        }
                    }
                }
            )
        }

        if (leaveCode !== undefined) {
            formFieldsList.push(
                {
                    id: "leaveCode",
                    displayName: leaveCode.label,
                    header: leaveCode.label,
                    required: false,
                    visible: true,
                    disabled: false,
                    labelName: leaveCode.label,
                    description: leaveCode.hint,
                    valueType: leaveCode.inputType,
                    name: "leaveCode",
                    options: {
                        optionSet: {
                            id: 'leaveCode',
                            options: dataElements
                                .filter((dx: any) => dx.optionSetValue === leaveCode.optionSetValue && dx.valueType === leaveCode.valueType)
                                .flatMap((x: any) => x?.optionSet?.options) || []
                        }
                    }
                }
            )
        }

        return formFieldsList
    }
    return { getFormFields }
}
