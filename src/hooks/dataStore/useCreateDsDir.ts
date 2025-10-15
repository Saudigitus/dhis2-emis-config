import { useShowAlerts } from 'dhis2-semis-functions';
import { config } from '../../utils/constants/config/config';
import { useDataMutation } from '@dhis2/app-runtime';
import { useSetRecoilState } from 'recoil';
import { DataStoreConfigState } from '../../atoms/DataStoreSchema';

export function useCreateDsDir({ keySpace, setLoading, type }: { type: any, keySpace: string, setLoading: (args: boolean) => void }) {
    const { hide, show } = useShowAlerts()
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)


    const [mutate, { error }] = useDataMutation({
        resource: `${keySpace}`,
        data: () => config,
        type: type,
        params: {
            importStrategy: 'CREATE_AND_UPDATE'
        }
    },
        {
            onError(error) {
                setLoading(false)
                show({
                    message: `Could not get data: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            },
            onComplete: async () => {
                setDataStoreConfigState(config as any)
                setLoading(false)
            }
        }
    )



    return { createDir: mutate, error }
}