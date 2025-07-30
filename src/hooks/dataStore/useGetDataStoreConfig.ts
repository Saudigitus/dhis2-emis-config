import { useShowAlerts } from "dhis2-semis-functions"
import { useDataEngine } from "@dhis2/app-runtime"

export default function useGetDataStoreConfig({ setLoading }: { setLoading: (args: boolean) => void }) {
    const { show, hide } = useShowAlerts()
    const engine = useDataEngine()

    const getDataStore = async (key: string) => {
        return await engine.query(
            {
                dataStoreConfig: {
                    resource: key
                }
            }, {
            onError(error) {
                setLoading(false)
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete(data) {
                return data
            }
        })
    }

    return { getDataStore }
}