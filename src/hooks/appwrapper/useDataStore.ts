import { useDataQuery } from "@dhis2/app-runtime"
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { DataStoreState } from '../../schema/dataStoreSchema';
import useShowAlerts from '../commons/useShowAlert';

const DATASTORE_QUERY = ({
    config: {
        resource: "dataStore/semis/config2",
        params: {
            fields: "*"
        }
    }
})

export function useDataStore() {
    const setDataStoreState = useSetRecoilState(DataStoreState);
    const { hide, show } = useShowAlerts()
    const { data, loading, error } = useDataQuery<{ config: any }>(DATASTORE_QUERY, {
        onError(error) {
            show({
                message: `${("Could not get data")}: ${error.message}`,
                type: { critical: true }
            });
            setTimeout(hide, 5000);
        }
    })

    return {
        data: data?.config[0],
        loading,
        error
    }
}
