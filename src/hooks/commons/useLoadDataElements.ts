/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import useShowAlerts from "./useShowAlert"

const query: any = {
    programStages: {
        resource: "programStages",
        params: ({ programStageId }: { programStageId: string }) => (
            {
                fields: ['id', 'displayName', 'programStageDataElements[dataElement[id,displayName]]'],
                paging: false,
                filters: `filter=id:eq:${programStageId}`
            }
        )
    }
}

export default function useLoadDataElements() {
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

    const getDataElements = async (programStageId: string) => {
        try {
            await refetch({ programStageId })
        } catch (err: any) {
            show({
                message: `Can't load resources : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    }

    const extractDataElements = (programStages: any[]) => {
        if (programStages.length === 0) {
            return []
        }

        const dataElmts = programStages.reduce((prev: any, curr: any) => {
            prev = prev.concat(curr.programStageDataElements.map((p: any) => p.dataElement))
            return prev
        }, [])

        return dataElmts
    }

    if (error !== null && error !== undefined) {
        return {
            error,
            loading,
            getDataElements
        }
    }

    if (data !== null && data !== undefined) {
        return {
            data: {
                ...data,
                dataElements: extractDataElements(data.programStages.programStages)
            },
            loading,
            refetch,
            getDataElements
        }
    }
}
