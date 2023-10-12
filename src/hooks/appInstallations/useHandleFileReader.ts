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

    const clickOnUploadBtn = ({ item }: ClickOnUploadBtnProp) => {
        setCurrentItem(item)
        const fileElement: any = document.getElementById(`file-input-${item.id}`)
        if (fileElement !== undefined || fileElement !== null) {
            fileElement.removeAttribute('value')
            fileElement.click()
        }
    }

    const handleFileReader = async ({ event, item, dataStoreApps }: FileReaderProps) => {
        try {
            setLoading(true)
            const formData = new FormData()
            if (event.target.files[0]?.name?.split('.zip')?.[0] !== item.name) {
                throw new Error("The application that you try to install is not the correct one !")
            }

            formData.append('file', event.target.files[0], event.target.files[0]?.name)
            const uploadRoute = `${baseUrl}/api/apps.json`
            await axios.post(uploadRoute, formData)

            if (updateDataStore !== undefined) {
                await updateDataStore({ dataStoreApps, item: { id: item.id } })
            }

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
