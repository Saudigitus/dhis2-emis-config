interface DataStoreAppInterf {
    id: string | number
    name: string
    category: string
    configKey: string
    configRoute: string
    enabled?: boolean
    appHubId?: string
    appType?: string
    folder?: string
    icon?: string
    updatedAt?: string
}

interface Dhis2AppInterf {
    name: string
    icons: any
    baseUrl: string
}
interface DataProps {
    dataStoreConfigs: any[]
    dataStoreValues: any[]
    dataStoreApps: any[]
    dhis2Apps: any[]
}

interface FetchDatasProps {
    loading: boolean
    error?: any
    data?: {
        dataStoreValues: any[]
        dataStoreConfigs: any[]
        dataStoreApps: any[]
        dhis2Apps: any[]
    }
}

interface AppListByCategoryProps {
    category: string
    data: FetchDatasProps["data"]
}

interface ProgramSubmitValueProps {
    program: string
    data: {
        dataStoreValues: any[]
    }
}

interface ProgramFormFieldProps {
    programs: any[]
    data: {
        dataStoreConfigs?: any[]
    }
}

interface ProgramFormProps {
    data: any
}

interface SubmitProgramDataProps {
    loadingProcessing: boolean
    submit: ({ data, program }: ProgramSubmitValueProps) => void
}

interface FetchProgramDatasProps {
    programs: any[]
    dataStoreValues: any[]
    dataStoreConfigs: any[]
}

interface FetchProgramDatasHooksProps {
    error?: any
    loading: boolean
    refetch?: () => void
    data: FetchProgramDatasProps
    programNotConfiguratedMessage?: string
}

export type {
    DataStoreAppInterf,
    ProgramSubmitValueProps,
    Dhis2AppInterf,
    DataProps,
    FetchDatasProps,
    AppListByCategoryProps,
    ProgramFormFieldProps,
    ProgramFormProps,
    SubmitProgramDataProps,
    FetchProgramDatasProps,
    FetchProgramDatasHooksProps
}
