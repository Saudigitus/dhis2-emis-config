import { type CustomAttributeProps } from "../../types/table/AttributeColumns"
import { getDataStoreElement } from "../../utils/functions"

interface FormFieldProps {
    programStages: any[]
    dataStoreConfigs: any[]
    dataElements: any[]
    getDataElements: (programStageId: string) => void
}

export default function useGetEnrollmentField() {
    const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
        if (getDataElements !== undefined && getDataElements !== null) {
            getDataElements(value.value)
        }
    }

    const getFormFields = ({ dataStoreConfigs, programStages, dataElements, getDataElements }: FormFieldProps) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "registration" })?.programStage
        const foundAcademicYear = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "registration" })?.academicYear
        const foundGrade = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "registration" })?.grade
        const foundSection = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "registration" })?.section

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

        if (foundAcademicYear !== undefined && foundAcademicYear !== null) {
            formFieldsList.push(
                {
                    id: "academicYear",
                    displayName: foundAcademicYear.label,
                    header: foundAcademicYear.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundAcademicYear.label,
                    description: foundAcademicYear.hint,
                    valueType: foundAcademicYear.inputType,
                    name: "academicYear",
                    options: {
                        optionSet: {
                            id: 'academicYear',
                            options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (foundGrade !== null && foundGrade !== undefined) {
            formFieldsList.push(
                {
                    id: "grade",
                    displayName: foundGrade.label,
                    header: foundGrade.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundGrade.label,
                    description: foundGrade.hint,
                    valueType: foundGrade.inputType,
                    name: "grade",
                    options: {
                        optionSet: {
                            id: 'grade',
                            options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (foundSection !== undefined && foundSection !== null) {
            formFieldsList.push(
                {
                    id: "section",
                    displayName: foundSection.label,
                    header: foundSection.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundSection.label,
                    description: foundSection.hint,
                    valueType: foundSection.inputType,
                    name: "section",
                    options: {
                        optionSet: {
                            id: 'section',
                            options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        return formFieldsList
    }

    return { getFormFields }
}
