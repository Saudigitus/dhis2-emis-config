import { useDataMutation } from '@dhis2/app-runtime'
import { useShowAlerts } from 'dhis2-semis-functions';
import { config } from '../../utils/constants/config/config';

export function useCreateDsDir({ keySpace, setLoading }: { keySpace: string, setLoading: (args: boolean) => void }) {
    const { hide, show } = useShowAlerts()

    const [mutate, { error }] = useDataMutation({
        resource: `${keySpace}`,
        data: () => config,
        type: 'create'
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
            onComplete: async (data) => {
                setLoading(false)
            }
        }
    )



    return { createDir: mutate, error }
}