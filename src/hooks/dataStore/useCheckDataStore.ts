import { useCreateDsDir } from "./useCreateDsDir";
import { useDataEngine } from "@dhis2/app-runtime"
import { useShowAlerts } from "dhis2-semis-functions";
import { useState } from 'react'
import useGetDataStoreConfig from "./useGetDataStoreConfig";
import { DataStoreConfigState } from "../../atoms/DataStoreSchema";
import { useSetRecoilState } from "recoil";

const DATASTORE_QUERY = (keySpace: string) => {
    return {
        result: {
            resource: `${keySpace}`,
            params: {
                fields: "."
            }
        }
    }
}

export function useCheckDataStore(keySpace: string) {
    const { hide, show } = useShowAlerts()
    const engine = useDataEngine()
    const [loading, setLoading] = useState<boolean>(true)
    const { createDir, error: createError } = useCreateDsDir({ keySpace, setLoading, type: 'create' })
    const nameSpace = keySpace.substring(0, keySpace.lastIndexOf("/"))
    const { getDataStore } = useGetDataStoreConfig({ setLoading })
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)

    const startCheck = async () => {
        await engine.query(DATASTORE_QUERY(nameSpace), {
            onError(error) {
                setLoading(false)
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete(data) {
                checkDataStore(data?.result).finally(() => setLoading(false))
            }
        })
    }

    const checkDataStore = async (data: any) => {
        const hasTemplatesKey = data?.entries?.some((entry: any) => entry.key == keySpace?.split('/')?.[keySpace?.split('/').length - 1]);
        if (!(data?.entries?.length && hasTemplatesKey)) {
            await createDir()
        } else {
            await getDataStore(`dataStore/semis/config`).then((data: any) => {
                setDataStoreConfigState(data?.dataStoreConfig)
            })
        }
    }

    return {
        loading,
        createError,
        startCheck,
    }
}
