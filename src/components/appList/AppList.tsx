import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import type AppItemProps from './IAppItem'
import AppItem from './AppItem'

interface Props {
    data: AppItemProps[]
}

const AppList = ({ data, ...props }: Props) => {
    return (
        <>
            <div>
                {data.map((item: any) => <AppItem key={uuidv4()} {...item} />)}
            </div>
        </>
    )
}

export default AppList
