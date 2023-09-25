import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import type AppItemProps from './IAppItem'
import AppItem from './AppItem'

interface Props {
    data: AppItemProps[]
    updateDataStore: any
    setNotification: any
    filterApps: any
    dhis2Apps: any
    me: any
}

const AppList = ({ ...props }: Props) => {
    const { data, dhis2Apps, filterApps, setNotification, updateDataStore, me } = props
    return (
        <>
            <div>
                {
                    filterApps(data, dhis2Apps).map((item: any) => (
                        <AppItem
                            {...item}
                            me={me}
                            key={uuidv4()}
                            setNotification={setNotification}
                            updateDataStore={updateDataStore}
                        />
                    ))}
            </div>
        </>
    )
}

export default AppList
