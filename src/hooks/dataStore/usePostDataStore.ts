import { useShowAlerts } from "dhis2-semis-functions"
import { useDataEngine } from "@dhis2/app-runtime"
import { useState } from "react"

export default function usePostDataStore() {
    const engine = useDataEngine()
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(false)
    const { show, hide } = useShowAlerts()

    const createDataStore = async ({ data, message, key }: { data: any, message?: string, key: string }) => {
        setLoading(true)
        const type: any = 'update'
        await engine.mutate({
            resource: key,
            type: type,
            data: data,
            params: {
                importStrategy: 'CREATE_AND_UPDATE'
            }
        }, {
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
    return { createDataStore, loading, error }
}