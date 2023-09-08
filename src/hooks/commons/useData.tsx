import React, { useEffect, useContext, useState } from 'react'
import { useFetchData } from "./useFetchData"

const resources = (resource:string, fields:string, filter:string, page?:number, pageSize?:number) => ({
    resource: resource,
    fields,
    params: {
        pageSize: pageSize,
        page: page,
        filter: filter,
    },
})

export const useData = (resource:string, fields:string, filter:string, page?:number, pageSize?:number) => {

    const { error, loading, data, validationText, getData, totalData, totalPages} = useFetchData(
        resources(resource, fields,  filter, page, pageSize, )
    )

    return { getData, data, error, loading, validationText, page, pageSize, totalData, totalPages }
}