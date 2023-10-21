import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"

const query: any = {
    me: {
        resource: 'me',
        params: {
            fields: ["username"]
        }
    }
}

const useGetMe = () => {
    const { show, hide } = useShowAlerts()
    const { data, loading } = useDataQuery(query, {
        onError: (err: FetchError) => {
            show({
                message: `Could not get me info : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    return { me: data?.me, loading }
}

export default useGetMe
