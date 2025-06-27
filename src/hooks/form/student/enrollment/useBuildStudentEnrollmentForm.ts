import { useUrlParams } from "dhis2-semis-functions"
import { CustomAttributeProps } from "dhis2-semis-types"
import { SectionType } from "../../../../types/variables/Variables"
import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"

function useBuildStudentEnrollmentForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery().get("section") as SectionType


    // const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
    //     if (getDataElements !== undefined && getDataElements !== null) {
    //         getDataElements(value.value)
    //     }
    // }

    const buildStudentEnrollmentForm = ({ dataStoreConfig, programStages, dataElements }: any) => {
        const formFieldsList: CustomAttributeProps[] = []
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


        // if (foundProgramStage !== undefined && foundProgramStage !== null) {
        //     formFieldsList.push(
        //         {
        //             visible: true,
        //             disabled: false,
        //             labelName: foundProgramStage.label,
        //             description: foundProgramStage.hint,
        //             valueType: foundProgramStage.inputType,
        //             id: "programStage",
        //             displayName: foundProgramStage.label,
        //             header: foundProgramStage.label,
        //             name: "programStage",
        //             required: true,
        //             // onChange: (value: any) => { onProgramStageSelected(value, getDataElements) },
        //             options: {
        //                 optionSet: {
        //                     id: 'programStage',
        //                     options: programStages?.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
        //                 }
        //             }
        //         }
        //     )
        // }

        // if (foundAcademicYear !== undefined && foundAcademicYear !== null) {
        //     formFieldsList.push(
        //         {
        //             id: "academicYear",
        //             displayName: foundAcademicYear.label,
        //             header: foundAcademicYear.label,
        //             required: true,
        //             visible: true,
        //             disabled: false,
        //             labelName: foundAcademicYear.label,
        //             description: foundAcademicYear.hint,
        //             valueType: foundAcademicYear.inputType,
        //             name: "academicYear",
        //             options: {
        //                 optionSet: {
        //                     id: 'academicYear',
        //                     options: dataElements?.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
        //                 }
        //             }
        //         }
        //     )
        // }

        // if (activeAcademicYear !== undefined && activeAcademicYear !== null) {
        //     formFieldsList.push(
        //         {
        //             id: "academicYear",
        //             displayName: activeAcademicYear.label,
        //             header: activeAcademicYear.label,
        //             required: true,
        //             visible: true,
        //             disabled: false,
        //             labelName: activeAcademicYear.label,
        //             description: activeAcademicYear.hint,
        //             valueType: activeAcademicYear.inputType,
        //             name: "activeAcademicYear",
        //             options: {
        //                 optionSet: {
        //                     id: 'activeAcademicYear',
        //                     options: dataElements
        //                         ?.filter((dx: any) => dx.optionSetValue === activeAcademicYear.optionSetValue && dx.valueType === activeAcademicYear.valueType)
        //                         ?.flatMap((x: any) => x?.optionSet?.options) || []
        //                 }
        //             }
        //         }
        //     )
        // }

        // if (foundGrade !== undefined) {
        //     formFieldsList.push(
        //         {
        //             id: "grade",
        //             displayName: foundGrade.label,
        //             header: foundGrade.label,
        //             required: true,
        //             visible: true,
        //             disabled: false,
        //             labelName: foundGrade.label,
        //             description: foundGrade.hint,
        //             valueType: foundGrade.inputType,
        //             name: "grade",
        //             options: {
        //                 optionSet: {
        //                     id: 'grade',
        //                     options: dataElements?.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
        //                 }
        //             }
        //         }
        //     )
        // }

        // if (foundSection !== undefined) {
        //     formFieldsList.push(
        //         {
        //             id: "section",
        //             displayName: foundSection.label,
        //             header: foundSection.label,
        //             required: true,
        //             visible: true,
        //             disabled: false,
        //             labelName: foundSection.label,
        //             description: foundSection.hint,
        //             valueType: foundSection.inputType,
        //             name: "section",
        //             options: {
        //                 optionSet: {
        //                     id: 'section',
        //                     options: dataElements?.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
        //                 }
        //             }
        //         }
        //     )
        // }

        return formFieldsList
    }

    return { buildStudentEnrollmentForm }
}

export { useBuildStudentEnrollmentForm }