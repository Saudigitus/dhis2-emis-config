import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"

const query: any = {
    dhis2Apps: {
        resource: "apps",
        params: {
            filter: "appType:eq:RESOURCE"
        }
    }
}

const useGetAppListFromDHIS2 = () => {
    const { show, hide } = useShowAlerts()
    const { data, loading, refetch } = useDataQuery<any>(query, {
        onError: (err: FetchError) => {
            show({
                message: `Could not get app list from dhis2 : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    return { dhis2Apps: data?.dhis2Apps, loading, refetch }
}

export default useGetAppListFromDHIS2
