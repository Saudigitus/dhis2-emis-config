import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import type AppItemProps from './IAppItem'
import AppItem from './AppItem'

interface Props {
    data: AppItemProps[]
    updateDataStore: any
    setNotification: any
}

const AppList = ({ data, ...props }: Props) => {
    return (
        <>
            <div>
                {data.map((item: any) => (
                    <AppItem
                        {...item}
                        key={uuidv4()}
                        setNotification={props.setNotification}
                        updateDataStore={props.updateDataStore}
                    />
                ))}
            </div>
        </>
    )
}

export default AppList
