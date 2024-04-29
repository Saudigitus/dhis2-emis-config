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

interface SubmitFinalResultValue {
    status: string
    programStage: string
}

interface SubmitEnrollmentValue {
    programStage: string
    academicYear: string
    grade: string
    section: string
}

interface SubmitTransferValue{
    programStage: string
    originSchool: string
    destinySchool: string
    reason: string
    status: string
}

export type { SubmitAttendanceValue, LoadProgramStagesResponse,SubmitFinalResultValue, LoadDataElementsResponse, SubmitEnrollmentValue, UseFetchEnrollmentDatasResponse, SubmitTransferValue }
