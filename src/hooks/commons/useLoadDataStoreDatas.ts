/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "./useShowAlert"

const query = {
    dataStoreValues: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
    },
    dataStoreConfigs: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
    }
}

export default function useLoadDataStoreDatas(lazy: boolean = false) {
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
