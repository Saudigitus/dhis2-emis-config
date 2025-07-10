import { useSetRecoilState } from "recoil"
import { useShowAlerts } from "dhis2-semis-functions"
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import { DataStoreConfigState } from "../../atoms/DataStoreSchema"

const query = {
    dataStoreConfig: {
        resource: `dataStore/edson/config`
    }
}

export default function useGetDataStoreConfig() {
    const { show, hide } = useShowAlerts()
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)

    const { data, error, loading, refetch } = useDataQuery<any>(query, {
        onComplete: (response: any) => {
            setDataStoreConfigState(response?.dataStoreConfig)
        },
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources : ${error.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    return { refetch, loading, data, error }
}