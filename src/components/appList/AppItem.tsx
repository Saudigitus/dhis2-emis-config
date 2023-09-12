/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react'
import style from "./AppItem.module.css"
import { Status } from './AppStatus'
import { Button } from '@dhis2/ui'
import { useConfig } from '@dhis2/app-runtime'
import axios from 'axios'
import { NOTIFICATION_CRITICAL, NOTIFICATION_SUCCESS } from './AppListNotification'
import dayjs from 'dayjs'

export default function AppItem(item: any): React.ReactElement {
    const [loadingUpload, setLoadingUpload] = useState(false)
    const { baseUrl } = useConfig()
    const [currentItem, setCurrentItem] = useState<any>()

    const { updateDataStore, setNotification } = item

    const handleClickOnUploadBtn = () => {
        setCurrentItem(item)
        const fileElement: any = document.getElementById(`file-input-${item.id}`)
        if (fileElement !== undefined || fileElement !== null) {
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

            if (updateDataStore !== undefined) {
                updateDataStore(item)
            }

            setLoadingUpload(false)
            const fileElement: any = document.getElementById(`file-input-${item.id}`)
            if (fileElement !== undefined || fileElement !== null) {
                fileElement.removeAttribute('value')
            }
            setNotification({ show: true, message: "Upload successful", type: NOTIFICATION_SUCCESS })
        } catch (err: any) {
            const fileElement: any = document.getElementById(`file-input-${item.id}`)
            if (fileElement !== undefined || fileElement !== null) {
                fileElement.removeAttribute('value')
            }
            setLoadingUpload(false)
            setNotification({ show: true, message: (Boolean((err.response?.data?.message))) || err.message, type: NOTIFICATION_CRITICAL })
        }
    }

    const getColor = (status: Status) => {
        if (status === Status.INSTALLED) {
            return "#21b26d"
        }

        if (status === Status.DISABLED) {
            return "#EAB631"
        }

        if (status === Status.NOT_INSTALLED) {
            return "#F05C5C"
        }
        return ""
    }
    return (
        <>
            <div
                className={style.AppItemContainer}
                style={{
                    borderRadius: '5px',
                    marginTop: '10px',
                    border: `2px solid ${getColor(item.status)}`
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div><img style={{ width: '40px', height: '40px' }} src={item.icon} /></div>
                    <div style={{ marginLeft: '30px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontStyle: 'italic', color: '#00000090', fontSize: '14px' }}>
                                Version {`${item.version} - ${item.updatedAt !== undefined ? dayjs(item.updatedAt).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}`}
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <input
                            style={{ display: 'none' }}
                            id={`file-input-${item.id}`}
                            onChange={handleFileReader}
                            type="file"
                            accept=".zip"
                        />
                        <Button loading={currentItem?.id === item.id ? loadingUpload : false} disabled={loadingUpload} primary onClick={handleClickOnUploadBtn}> Upload </Button>
                    </div>
                    <div style={{ marginLeft: '10px' }}><Button primary>Install from App Hub</Button></div>
                </div>
            </div>
        </>
    )
}
