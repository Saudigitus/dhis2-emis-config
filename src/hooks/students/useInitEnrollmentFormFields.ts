import { getDataStoreElement } from "../../utils/functions"

export default function useInitEnrollmentFormFields() {
    const initFields = (programStages: any[] | undefined, dataElements: any[] | undefined, dataStoreValues: any[]) => {
        if (
            programStages !== undefined &&
            programStages !== null &&
            programStages.length > 0 &&
            dataElements !== undefined &&
            dataElements !== null &&
            dataElements.length > 0
        ) {
            console.log({
                programStage: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.programStage,
                grade: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.grade,
                section: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.section,
                academicYear: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.academicYear
            })
            return {
                programStage: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.programStage,
                grade: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.grade,
                section: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.section,
                academicYear: getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.academicYear
            }
        }
    }
    return { initFields }
}
