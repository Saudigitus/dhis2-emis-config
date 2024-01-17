/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useConfig } from '@dhis2/app-runtime'
import axios from 'axios'
import { useState } from 'react'
import { useUpdateDataStore } from './'
import useShowAlerts from '../commons/useShowAlert'

export interface FileReaderProps {
    event: any
    item: { name: string, id: any }
    dataStoreApps: any[]
    dataStoreAppsRefresh: any
    dhis2AppsRefresh: any
}

export interface ClickOnUploadBtnProp {
    item: {
        id: any
    }
}

export default function useHandleFileReader() {
    const [loading, setLoading] = useState(false)
    const { baseUrl } = useConfig()
    const [currentItem, setCurrentItem] = useState<any>()
    const { updateDataStore } = useUpdateDataStore()
    const { show, hide } = useShowAlerts()
    // const { refetch } = useLoadDataStoreApps(true)

    const clickOnUploadBtn = ({ item }: ClickOnUploadBtnProp) => {
        setCurrentItem(item)
        const fileElement: any = document.getElementById(`file-input-${item.id}`)
        if (fileElement !== undefined || fileElement !== null) {
            fileElement.removeAttribute('value')
            fileElement.click()
        }
    }

    const handleFileReader = async ({ event, item, dataStoreApps, dataStoreAppsRefresh, dhis2AppsRefresh }: FileReaderProps) => {
        try {
            setLoading(true)
            const formData = new FormData()
            if (event.target.files[0]?.name?.split('.zip')?.[0] !== item.name) {
                throw new Error("The application that you try to install is not the correct one !")
            }

            formData.append('file', event.target.files[0], event.target.files[0]?.name)
            const uploadRoute = `${baseUrl}/api/apps.json`
            await axios.post(uploadRoute, formData)

            // const storeApplicationList = await refetch()
            // console.log(storeApplicationList)
            await updateDataStore({ dataStoreApps, item: { id: item.id } })

            dhis2AppsRefresh()
            dataStoreAppsRefresh()

            console.log("dataStoreAppsRefresh: ", dataStoreAppsRefresh)
            console.log("dhis2AppsRefresh: ", dhis2AppsRefresh)

            setLoading(false)
            const fileElement: any = document.getElementById(`file-input-${item.id}`)
            if (fileElement !== undefined || fileElement !== null) {
                fileElement.removeAttribute('value')
            }

            show({
                message: `Update success !`,
                type: { success: true }
            })
            setTimeout(hide, 4000)
        } catch (err: any) {
            console.log("Error: ", err)
            const fileElement: any = document.getElementById(`file-input-${item.id}`)
            if (fileElement !== undefined || fileElement !== null) {
                fileElement.removeAttribute('value')
            }
            setLoading(false)
            show({
                message: `Can't update datastore : ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    }

    return { clickOnUploadBtn, handleFileReader, currentItem, loading }
}
