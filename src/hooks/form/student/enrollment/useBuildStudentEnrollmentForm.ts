import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"

function useBuildStudentEnrollmentForm() {


    // const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
    //     if (getDataElements !== undefined && getDataElements !== null) {
    //         getDataElements(value.value)
    //     }
    // }

    const buildStudentEnrollmentForm = ({ dataStoreConfig, programStages, dataElements }: any) => {
        const formFieldsList: any[] = []
        // const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: "student", element: "registration" })?.["programStage" as keyof DataStoreConfigType["registration"]]
        const foundAcademicYear: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: "student", element: "registration" })?.["academicYear" as keyof DataStoreConfigType["registration"]]
        const foundGrade: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: "student", element: "registration" })?.["grade" as keyof DataStoreConfigType["registration"]]
        const foundSection: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: "student", element: "registration" })?.["section" as keyof DataStoreConfigType["registration"]]
        const activeAcademicYear: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: "student", element: "registration" })?.["activeAcademicYear" as keyof DataStoreConfigType["registration"]]

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
                    // onChange: (value: any) => { onProgramStageSelected(value, getDataElements) },
                    options: {
                        optionSet: {
                            id: 'programStage',
                            options: programStages?.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
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
                            options: dataElements?.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (activeAcademicYear !== undefined && activeAcademicYear !== null) {
            formFieldsList.push(
                {
                    id: "academicYear",
                    displayName: activeAcademicYear.label,
                    header: activeAcademicYear.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: activeAcademicYear.label,
                    description: activeAcademicYear.hint,
                    valueType: activeAcademicYear.inputType,
                    name: "activeAcademicYear",
                    options: {
                        optionSet: {
                            id: 'activeAcademicYear',
                            options: dataElements
                                ?.filter((dx: any) => dx.optionSetValue === activeAcademicYear.optionSetValue && dx.valueType === activeAcademicYear.valueType)
                                ?.flatMap((x: any) => x?.optionSet?.options) || []
                        }
                    }
                }
            )
        }

        if (foundGrade !== undefined) {
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
                            options: dataElements?.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        if (foundSection !== undefined) {
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
                            options: dataElements?.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                        }
                    }
                }
            )
        }

        return formFieldsList
    }

    return { buildStudentEnrollmentForm }
}

export { useBuildStudentEnrollmentForm }