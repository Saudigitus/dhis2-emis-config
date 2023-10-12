/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"

const query: any = {
    dataStoreApps: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`
    }
}

const useGetAppListFromDataStore = () => {
    const { show, hide } = useShowAlerts()
    const { data, loading, refetch } = useDataQuery<any>(query, {
        onError: (err: FetchError) => {
            show({
                message: `Could not get app list from datastore : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    return { dataStoreApps: data?.dataStoreApps, loading, refetch }
}

export default useGetAppListFromDataStore
