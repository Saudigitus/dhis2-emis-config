/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from 'react'
import { Status } from './AppStatus'
import { Button } from '@dhis2/ui'
import dayjs from 'dayjs'
import style from "./AppItem.module.css"
import { useGetRightColor, useHandleFileReader } from '../../hooks/appInstallations'
import classNames from 'classnames'
import { type ClickOnUploadBtnProp, type FileReaderProps } from '../../hooks/appInstallations/useHandleFileReader'

interface useFileReaderProp {
    loading: boolean
    currentItem: any
    handleFileReader: ({ dataStoreApps, event, item }: FileReaderProps) => void
    clickOnUploadBtn: ({ item }: ClickOnUploadBtnProp) => void
}

export default function AppItem(item: any): React.ReactElement {
    const { dataStoreApps, id, me } = item
    const { getColor } = useGetRightColor()
    const { loading, currentItem, handleFileReader, clickOnUploadBtn }: useFileReaderProp = useHandleFileReader()

    return (
        <>
            <div className={classNames(style.AppItemContainer, getColor(item.status))}>
                <div className={style.AppItemContainerFlex}>
                    <div>
                        <img className={style.AppItemImageStyle} src={item.icon} />
                    </div>
                    <div className={style.appItemContainerMarginLeft}>
                        <div className={style.AppItemName}>{item.name}</div>
                        <div className={style.AppItemFlexMargin}>
                            {
                                item.status === Status.INSTALLED && (
                                    <>
                                        <span className={style.AppItemVersion}>
                                            Version {`${item.version} - ${item.updatedAt !== undefined ? dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') : dayjs().format('YYYY-MM-DD HH:mm:ss')}`}
                                        </span>
                                        {
                                            me?.username !== undefined && (
                                                <span className={style.AppItemBy}>
                                                    {` by ${me?.username}`}
                                                </span>
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                item.status === Status.NOT_INSTALLED && (
                                    <span className={style.appItemStatus}>
                                        Not Installed
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={style.AppItemContainerFlex}>
                    <div>
                        <input
                            style={{ display: 'none' }}
                            id={`file-input-${item.id}`}
                            onChange={(event: any) => { handleFileReader({ event, dataStoreApps, item }) }}
                            type="file"
                            accept=".zip"
                        />
                        <Button loading={currentItem?.id === item.id ? loading : false} disabled={loading} primary onClick={() => { clickOnUploadBtn({ item: { id } }) }}>
                            {item.id === currentItem?.id && loading ? <span>Processing...</span> : <span>Upload</span>}
                        </Button>
                    </div>
                    <div className={style.AppItemMarginLeft}>
                        <Button primary>
                            {item.status === Status.INSTALLED ? <span>Update from App Hub</span> : <span>Install from App Hub</span>}
                        </Button>
                    </div>
                </div>
            </div >
        </>
    )
}
