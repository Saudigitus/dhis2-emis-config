type GetElementOptionsProps = {
    resource: string,
    dataElements: any[],
    programStages: any[],
}

const getElementOptions = ({ resource, programStages, dataElements }: GetElementOptionsProps) => {
    if (resource === "programStages") {
        return programStages?.map((prog: any) => ({
            value: prog.id,
            label: prog.displayName
        }))
    }
    if (resource === "dataElements") {
        return dataElements?.map((dx: any) => ({
            value: dx?.dataElement?.id,
            label: dx?.dataElement?.displayName
        }))
    }

    return []
}

export { getElementOptions }