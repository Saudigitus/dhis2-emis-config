import { getDataStoreElement } from "../../utils/functions"

export default function useInitEnrollmentFields() {
    const initFields = (dataElements: any[], dataStoreValues: any[]) => {
        const programStage = getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.programStage
        const grade = getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.grade
        const section = getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.section
        const academicYear = getDataStoreElement({ dataStores: dataStoreValues, elementKey: "registration", key: "student" })?.academicYear
        console.log(dataElements)
        return dataElements.length > 0 ? { programStage, grade, section, academicYear } : null
    }
    return { initFields }
}
