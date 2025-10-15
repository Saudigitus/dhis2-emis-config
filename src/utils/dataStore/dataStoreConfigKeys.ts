import { DataStoreConfigType } from "../../types/dataStore/dataStoreConfigType";

interface DataStoreElementProps {
    sectionType: "student" | "staff"
    element: keyof DataStoreConfigType
    dataStoreConfig: DataStoreConfigType[] | any
}

const getDataStoreConfigKeys = (props: DataStoreElementProps) => {
    const { sectionType, element, dataStoreConfig } = props;
    const foundElement = dataStoreConfig?.find((value: DataStoreConfigType) => value.key === sectionType)
  
    if (foundElement === undefined || foundElement === null) {
        return undefined
    }

    return foundElement[element]
}

export { getDataStoreConfigKeys }