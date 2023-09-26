/* eslint-disable*/

interface DataStoreElementProps {
    dataStores: any[]
    key: string
    elementKey: string
}

export const getDataStoreElement = (item: DataStoreElementProps) => {
    const foundElement = item.dataStores.find(el => el.key === item.key)
    if (!foundElement) {
        return null
    }

    return foundElement[`${item.elementKey}`]
} 