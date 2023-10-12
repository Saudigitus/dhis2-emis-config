/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"

const query = {
    programs: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'programType'],
            filter: "programType:eq:WITH_REGISTRATION"
        }
    },
    dataStoreValues: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
    },
    dataStoreConfigs: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
    }
}

export default function useFetchProgramDatas() {
    const { show, hide } = useShowAlerts()
    const { data, error, loading, refetch } = useDataQuery<any>(query, {
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources : ${error.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    return { refetch, loading, data: (data?.programs?.programs !== undefined || data?.programs?.programs !== null) ? { ...data, programs: data.programs.programs } : null, error }
}
