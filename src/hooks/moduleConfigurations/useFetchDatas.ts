/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"
import { type FetchDatasProps } from "../../types/moduleConfigurations"

const query = {
    dataStoreValues: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
    },
    dataStoreConfigs: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
    },
    dataStoreApps: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`
    },
    dhis2Apps: {
        resource: 'apps',
        params: {
            paging: false,
            fields: ["name", "icons", "baseUrl"],
            filter: "programType:eq:WITH_REGISTRATION"
        }
    }
}

export default function useFetchDatas(): FetchDatasProps {
    const { show, hide } = useShowAlerts()
    const { data, error, loading } = useDataQuery<any>(query, {
        onError: (err: FetchError) => {
            show({
                message: `Can't get datas : ${err.message}`,
                type: {}
            })
            setTimeout(hide, 5000)
        }
    })

    return { data, error, loading }
}
