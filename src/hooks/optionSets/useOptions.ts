import React from 'react'
import { useData } from '../commons/useData'


export const useOptions = (fields: string, resource: string, filter:string) => {
    const { getData, data, error, loading } = useData(resource, fields, filter)
    
    return { options: data, loading, getData }
}

