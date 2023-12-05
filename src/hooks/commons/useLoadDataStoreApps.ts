/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "./useShowAlert"

const query = {
    dataStoreApps: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`
    }
}

export default function useLoadDataStoreApps(lazy: boolean = false) {
    const { show, hide } = useShowAlerts()
    const { data, error, loading, refetch } = useDataQuery<any>(query, {
        lazy,
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources : ${error.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })
    return { data, error, loading, refetch }
}
