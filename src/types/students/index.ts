interface GetEnrollmentFormFieldsProps {
    dataStoreConfigs: any[]
    programStages: any[]
    dataElements: any[]
    getDataElements: (programStageId: string) => void
}

interface UseFetchEnrollmentDatasResponse {
    loading: boolean
    data?: {
        dataStoreConfigs: GetEnrollmentFormFieldsProps["dataStoreConfigs"]
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
    getProgramStages: (programId: string) => void
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

interface SubmitEnrollmentValue {
    programStage: string
    academicYear: string
    grade: string
    section: string
}

export type { LoadProgramStagesResponse, LoadDataElementsResponse, SubmitEnrollmentValue, GetEnrollmentFormFieldsProps, UseFetchEnrollmentDatasResponse }
