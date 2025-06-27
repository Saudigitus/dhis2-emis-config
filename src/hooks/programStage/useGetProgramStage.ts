import { useShowAlerts } from "dhis2-semis-functions"
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"

const query: any = {
    programStages: {
        resource: "programStages",
        params: ({ programId, filter }: { programId: string, filter?: string | undefined | null }) => (
            {
                fields: ['id', 'displayName'],
                paging: false,
                filter: filter !== undefined && filter !== null && filter.trim().length > 0
                    ? [`program.id:eq:${programId}`, `${filter.trim()}`]
                    : [`program.id:eq:${programId}`]
            }
        )
    },
    // programStageDataElements: {

    // }
}

export default function useGetProgramStages() {
    const { show, hide } = useShowAlerts()

    const { data, refetch, error, loading } = useDataQuery<any>(query, {
        lazy: true,
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources : ${error.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    const getProgramStages = async (program: string, filter = undefined) => {
        console.log(program)
        try {
            await refetch({ program, filter })
        } catch (err: any) {
            show({
                message: `Can't load resources : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    }

    return {
        error, loading, refetch, getProgramStages, programStages: data?.programStages?.programStages || [],
    }
}