import { useState } from 'react'
import useGetDataStoreConfig from "./useGetDataStoreConfig";
import { DataStoreConfigState } from "../../atoms/DataStoreSchema";
import { useSetRecoilState } from "recoil";
import { useCreateDsDir } from './useCreateDsDir';
import { areObjectsEqual } from '../../utils/valuesFormatter/valuesFormatter';
import { config } from '../../utils/constants/config/config';
import { D2I18n } from 'dhis2-semis-types';

export function useCheckDataStore(keySpace: string, i18n: D2I18n) {
    const [loading, setLoading] = useState<boolean>(true)
    const { getDataStore } = useGetDataStoreConfig({ setLoading })
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)
    const { createDir, error: createError } = useCreateDsDir({ keySpace, setLoading, type: 'update', i18n })


    const startCheck = async () => {
        await getDataStore(keySpace).then((data: any) => {
            if (!areObjectsEqual(config(i18n), data?.dataStoreConfig)) {
                void createDir()
            } else {
                setDataStoreConfigState(data?.dataStoreConfig)
            }
        }).catch((error) => {
            const errorCode = error?.details.httpStatusCode
            if (errorCode == 404 || errorCode == undefined) {
                createDir();
            }
        })
    }

    return { loading, startCheck, createError }
}
