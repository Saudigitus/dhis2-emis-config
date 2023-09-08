import { atom } from "recoil"

interface attendance {
    absenceReason: string
    programStage: string
    status: string
}

interface programStages {
    programStage: string
}

interface performance {
    programStages: programStages[]
}

interface registrationParams {
    filter:string
    resource: string
} 

interface registration {
    academicYear: registrationParams[]
    grade: registrationParams[]
    programStage: registrationParams[]
    section: registrationParams[]
}

interface dataStoreRecord {
    attendance: attendance
    key: string
    lastUpdate?: string
    performance: performance
    program: string
    registration: registration
    ["socio-economics"]: registrationParams

}

export const DataStoreState = atom<dataStoreRecord | null>({
    key: "dataStore-get-state",
    default: null
})
