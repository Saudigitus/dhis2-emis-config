import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import type AppItemProps from './IAppItem'
import AppItem from './AppItem'
import { useFilterApps } from '../../hooks/appInstallations'
interface Props {
    data: AppItemProps[]
    dhis2Apps: any[]
    me?: any
}

const AppList = ({ ...props }: Props) => {
    const { data: dataStoreApps, dhis2Apps, me } = props
    const { filterApps } = useFilterApps()

    return (
        <>
            <div>
                {
                    filterApps({ dataStoreApps, dhis2Apps }).map((item: any) => (
                        <AppItem
                            {...item}
                            me={me}
                            key={uuidv4()}
                            dataStoreApps={dataStoreApps}
                        />
                    ))}
            </div>
        </>
    )
}

export default AppList
