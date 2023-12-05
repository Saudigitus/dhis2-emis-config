import React, { useState } from 'react'
import Title from "../text/Title"
import { Button } from '@dhis2/ui'
import { useConfig } from '@dhis2/app-runtime'
import axios from 'axios'

export default function AppListHeader(): React.ReactElement {
    const [loadingUpload, setLoadingUpload] = useState(false)
    const { baseUrl } = useConfig()

    const handleClickOnUploadBtn = () => {
        const fileElement: any = document.getElementById('file-input')
        if (fileElement !== undefined) {
            fileElement.removeAttribute('value')
            fileElement.click()
        }
    }

    const handleFileReader: any = async (event: any) => {
        try {
            setLoadingUpload(true)
            const formData = new FormData()
            formData.append('file', event.target.files[0], event.target.files[0]?.name)
            const uploadRoute = `${baseUrl}/api/apps.json`
            await axios.post(uploadRoute, formData)

            setLoadingUpload(false)
            const fileElement: any = document.getElementById('file-input')
            if (fileElement !== undefined) {
                fileElement.removeAttribute('value')
            }
        } catch (err) {
            const fileElement: any = document.getElementById('file-input')
            if (fileElement !== undefined) {
                fileElement.removeAttribute('value')
            }
            // setNotification({ show: true, message: err.response?.data?.message || err.message, type: NOTIFICATION_CRITICAL })
            setLoadingUpload(false)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title label="Apps Installation Status" />
           { 0 > 1 && <div>
                <input
                    style={{ display: 'none' }}
                    id='file-input'
                    onChange={handleFileReader}
                    type="file"
                    accept=".zip"
                />
                <Button loading={loadingUpload} disabled={loadingUpload} primary onClick={handleClickOnUploadBtn}> Upload </Button>
            </div> }
        </div>
    )
}
