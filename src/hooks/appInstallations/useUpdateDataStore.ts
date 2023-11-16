/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useState } from 'react'
import { type FetchError, useDataMutation } from "@dhis2/app-runtime"
import useShowAlerts from "../commons/useShowAlert"
import type AppItemProps from '../../components/appList/IAppItem'

const mutation: any = {
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`,
    type: "update",
    data: (payload: any) => payload
}

const useUpdateDataStore = () => {
    const { show, hide } = useShowAlerts()
    const [loading, setLoading] = useState(false)

    const [mutate] = useDataMutation(mutation, {
        onError: (err: FetchError) => {
            show({
                message: `Can't update datastore : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    })

    const updateDataStore = async ({ dataStoreApps, item }: { item: any, dataStoreApps: AppItemProps[] }) => {
        try {
            if (dataStoreApps?.length > 0) {
                setLoading(true)
                const payloads: any[] = dataStoreApps.map((app: AppItemProps) => {
                    if (app.id === item.id) {
                        return {
                            ...app,
                            updatedAt: new Date()
                        }
                    }
                    return app
                })

                await mutate(payloads)
                setLoading(false)
            }
        } catch (err: any) {
            setLoading(false)
            throw err
        }
    }

    return { updateDataStore, loading }
}
export default useUpdateDataStore
