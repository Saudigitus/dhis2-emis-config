import { useShowAlerts } from "dhis2-semis-functions"
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"

const query = {
    programs: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'programType'],
            // filter: "programType:eq:WITH_REGISTRATION"
        }
    }
}

export default function useGetPrograms() {
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

    return { refetch, loading, error, programs: data?.programs?.programs }
}