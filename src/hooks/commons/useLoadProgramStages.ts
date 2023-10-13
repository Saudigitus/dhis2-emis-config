/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "./useShowAlert"

const query: any = {
    programStages: {
        resource: "programStages",
        params: ({ programId }: { programId: string }) => (
            {
                fields: ['id', 'displayName', 'programStageDataElements[dataElement[id,displayName]]'],
                paging: false,
                filters: `filter=program.id:eq:${programId}`
            }
        )
    }
}

export default function useLoadProgramStages() {
    const { show, hide } = useShowAlerts()
    const { data, refetch, loading, error } = useDataQuery<any>(query, {
        lazy: true,
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources : ${error.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })
    const getProgramStages: any = async (programId: string) => {
        try {
            await refetch({ programId })
        } catch (err: any) {
            show({
                message: `Can't load resources : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    }

    if (error !== null && error !== undefined) {
        return {
            error,
            loading,
            getProgramStages
        }
    }

    if (data !== null && data !== undefined) {
        return {
            data: {
                ...data,
                programStages: data.programStages.programStages
            },
            loading,
            refetch,
            getProgramStages
        }
    }
}
