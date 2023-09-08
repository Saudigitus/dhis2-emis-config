import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useState } from 'react'
import { type resourceTypes } from '../../types/resources/resourceType'

const generalQuery = (resource:string, fields : string = "", params : any = {}) => ({
    data: {
        resource: resource,
        params: {
            fields,
            ...params
        }
    }
})

export const useFetchData = (resources : resourceTypes, lazy = true) => {
    let result = null
    const [objects, setObjects] = useState(null)
    const [loading, setloading] = useState(false)
    const [totalData, setTotalData] = useState(0)
    const [totalPages, setTotalPages] = useState()
    const { resource, fields, params } = resources
    const { engine, refetch, error, data, loading: loadingQuery } = useDataQuery(generalQuery(resource, fields, params), { lazy })


    function getData() {
        if (resource) {
            setloading(true)
            setObjects(null)
            
            engine.query(generalQuery(resource, fields, params), {
                onComplete: (res) => {
                    const list = res.data[resource] || res.data
                    setTotalData(res.data?.["pager"]?.total)
                    setTotalPages(res.data?.["pager"]?.pageCount)
                    setObjects(list)
                    setloading(false)
                },
                onError: (error) => {
                    console.error(error)
                    setloading(false)
                },
            })
        }
    }


    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the objects')} : ${error.message
        }`

    if (!lazy) {
        result = objects || data?.data || data
    }

    return { loading: loading || loadingQuery, error, validationText, data: result || objects, getData, refetch, totalData, totalPages }
}