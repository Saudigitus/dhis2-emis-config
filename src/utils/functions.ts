interface DataStoreElementProps {
    dataStores: any[]
    key: string
    elementKey: string
}

export const getDataStoreElement = (item: DataStoreElementProps) => {
    const foundElement = item.dataStores?.find(el => el.key === item.key)
    if (foundElement === undefined || foundElement === null) {
        return undefined
    }

    return foundElement[`${item.elementKey}`]
}

export const getIconUrl = (url: string, icons: any) => {
    if (icons[48] !== undefined) {
        return "".concat(url).concat('/').concat(icons[48])
    }
    if (icons[128] !== undefined) {
        return "".concat(url).concat('/').concat(icons[128])
    }
    if (icons[16] !== undefined) {
        return "".concat(url).concat('/').concat(icons[16])
    }
}

export const getCorrespondingColor = (elementKey: string, categoryType: string, dataStoreConfigs: any[], dataStoreValues: any[]) => {
    let color = 'unstable'
    console.log("dataStoreConfigs:  ", dataStoreConfigs)
    const currentElementConfig = getDataStoreElement({ dataStores: dataStoreConfigs, elementKey, key: categoryType })
    const currentElementValue = getDataStoreElement({ dataStores: dataStoreValues, elementKey, key: categoryType })
    if (elementKey === "performance" && categoryType === "Students") {
        console.log("current Element config :", currentElementConfig)
        console.log("current Element Value :", currentElementValue)
    }

    // unstable case
    if (
        currentElementValue === undefined ||
        currentElementValue === null ||
        (typeof currentElementValue === "string" && currentElementValue.trim().length === 0)
    ) {
        color = 'unstable'
    }

    // estable and updated case
    if (
        currentElementValue !== undefined &&
        currentElementValue !== null &&
        currentElementConfig !== null &&
        currentElementConfig !== undefined
    ) {
        if (typeof currentElementConfig === "object" && typeof currentElementValue === "object") {
            let isAllOk = true
            for (const keyStringValue of Object.keys(currentElementValue)) {
                const foundEl = currentElementValue[keyStringValue]
                console.log("Key string : ", keyStringValue, " value : ", foundEl)
                if (foundEl === null || foundEl === undefined || foundEl.length === 0) {
                    isAllOk = false
                }
            }
            if (isAllOk) {
                color = "updated"
            } else {
                color = "estable"
            }
        }
        if (typeof currentElementConfig === "string" && typeof currentElementValue === "string") {
            if (currentElementValue.trim().length > 0) {
                color = "updated"
            }
        }
    }

    return color
}

export const getCategoryName = (name: string) => {
    if (name === "staff") {
        return "Staffs"
    }

    if (name === "student") {
        return "Students"
    }

    return ""
}
