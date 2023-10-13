import { type FetchError } from "@dhis2/app-runtime"

interface GetEnrollmentFormFieldsProps {
    dataStoreConfigs: any[]
    programStages: any[]
    dataElements: any[]
    getDataElements: () => void
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

// interface LoadingProgramStagesResponse {
//     loading: boolean
//     data?: {
//         programStages: any[]
//     }
//     error?: FetchError
//     refetch?: () => void
//     getProgramStages: (programId: string) => void
// }
// interface LoadDataElementsResponse {
//     loading: boolean
//     data?: {
//         dataElements: any[]
//     }
//     error?: any
//     refetch?: () => void
//     getDataElements: Promise<GetEnrollmentFormFieldsProps["getDataElements"]>
// }

interface SubmitEnrollmentValue {
    programStage: string
    academicYear: string
    grade: string
    section: string
}

export type { SubmitEnrollmentValue, GetEnrollmentFormFieldsProps, UseFetchEnrollmentDatasResponse }
