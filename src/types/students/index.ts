interface UseFetchEnrollmentDatasResponse {
    loading: boolean
    data?: {
        dataStoreConfigs: any[]
        dataStoreValues: any[]
    }
    error?: any
    refetch?: () => void
}

interface LoadProgramStagesResponse {
    loadingProgramStages: boolean
    programStagesDatas?: {
        programStages: any[]
    }
    error?: any
    refetch?: () => void
    getProgramStages: (programId: string, filter?: string | undefined | null) => void
}
interface LoadDataElementsResponse {
    loading?: boolean
    dataElementsDatas?: {
        dataElements: any[]
    }
    error?: any
    refetch?: () => void
    getDataElements: (programStageId: string) => void
}

interface SubmitAttendanceValue {
    status: string
    programStage: string
    absenceReason: string
}


interface SubmitEnrollmentValue {
    programStage: string
    academicYear: string
    grade: string
    section: string
}

export type { SubmitAttendanceValue, LoadProgramStagesResponse, LoadDataElementsResponse, SubmitEnrollmentValue, UseFetchEnrollmentDatasResponse }
