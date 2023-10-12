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

export type { DataStoreAppInterf, Dhis2AppInterf, DataProps, FetchDatasProps, AppListByCategoryProps }
