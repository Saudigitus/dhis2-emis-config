import React from 'react'
import { CircularLoader } from '@dhis2/ui'
import style from './Loading.module.css'

interface LoadingProps {
    loadings: boolean[]
}

export default function Loading({ loadings }: LoadingProps): React.JSX.Element {
    return loadings.reduce((prev: boolean[], curr: boolean) => {
        if (curr) {
            prev.push(curr)
        }
        return prev
    }, []).length > 0
        ? (<div className={style.LoadingContainer}>
            <CircularLoader small />
            <span className={style.marginLeft}>Loading...</span>
        </div>)
        : (<div></div>)
}
