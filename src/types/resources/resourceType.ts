interface paramsType {
    pageSize: number | undefined
    page: number | undefined
    filter: string 
}

interface resourceTypes {
    resource:string
    fields: string
    params: paramsType
}

export type { paramsType, resourceTypes}