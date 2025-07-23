import { useSetRecoilState } from "recoil"
import { useShowAlerts } from "dhis2-semis-functions"
import { useDataEngine } from "@dhis2/app-runtime"
import { DataStoreConfigState } from "../../atoms/DataStoreSchema"

const query = {
    dataStoreConfig: {
        resource: `dataStore/semis/config`
    }
}

export default function useGetDataStoreConfig({ setLoading }: { setLoading: (args: boolean) => void }) {
    const { show, hide } = useShowAlerts()
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)
    const engine = useDataEngine()

    const getDataStore = async () => {
        await engine.query(query, {
            onError(error) {
                setLoading(false)
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete(data) {
                console.log(data,'got the data')
                setDataStoreConfigState(data?.dataStoreConfig)
            }
        })
    }

    return { getDataStore }
}