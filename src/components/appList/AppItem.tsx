import React, { useState } from 'react'
import style from "./AppItem.module.css"
import { Status } from './AppStatus'
import { Button } from '@dhis2/ui'
import type IAppItem from './IAppItem'
import { format } from 'date-fns'
import { useConfig } from '@dhis2/app-runtime'
import axios from 'axios'

export default function AppItem(item: IAppItem): React.ReactElement {
    const [loadingUpload, setLoadingUpload] = useState(false)
    const { baseUrl } = useConfig()
    const [currentItem, setCurrentItem] = useState<IAppItem>()

    const handleClickOnUploadBtn = () => {
        setCurrentItem(item)
        const fileElement: any = document.getElementById(`file-input-${item.id}`)
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
            console.log("base url : ", baseUrl)
            const uploadRoute = `${baseUrl}/api/apps.json`
            await axios.post(uploadRoute, formData)

            setLoadingUpload(false)
            const fileElement: any = document.getElementById(`file-input-${item.id}`)
            if (fileElement !== undefined) {
                fileElement.removeAttribute('value')
            }
        } catch (err) {
            const fileElement: any = document.getElementById(`file-input-${item.id}`)
            if (fileElement !== undefined) {
                fileElement.removeAttribute('value')
            }
            // setNotification({ show: true, message: err.response?.data?.message || err.message, type: NOTIFICATION_CRITICAL })
            setLoadingUpload(false)
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
                                Version {`${item.version} - ${format(item.updatedAt, 'yyyy-mm-dd')}`}
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

// AppItem.propTypes = {
//     item: PropTypes.object
// }
