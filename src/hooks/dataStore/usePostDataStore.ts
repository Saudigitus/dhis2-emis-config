import { useShowAlerts } from "dhis2-semis-functions"
import { useDataEngine } from "@dhis2/app-runtime"
import { useState } from "react"

const QUERY: any = {
    resource: `dataStore/edson/values`,
    type: "update",
    data: ({ data }: any) => data,
    params: {
        importStrategy: 'CREATE_AND_UPDATE'
    }
}

export default function usePostDataStore() {
    const engine = useDataEngine()
    const [error, setError] = useState<boolean>()
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const { show, hide } = useShowAlerts()

    const createDataStore = async ({ data, message }: { data: any, message?: string }) => {
        setLoading(true)
        await engine.mutate(QUERY, {
            variables: {
                data
            },
            onComplete: (response) => {
                setLoading(false)
                show({ message: message ?? "Configuration created", type: { success: true } })
            },
            onError: (error) => {
                setError(true)
                setLoading(false)
                show({
                    message: `Cannot create configuration`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }
        })
    }
    return { createDataStore, loading, data, error }
}