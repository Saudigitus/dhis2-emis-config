import { useRecoilValue } from "recoil";
import { DataStoreConfigState } from "../../../atoms/DataStoreSchema";
import { DataStoreConfigType } from "../../../types/dataStore/dataStoreConfigType";

export const getSelectedKey = () => {
    const { useQuery } = useParams()
    const emisConfig = useRecoilValue(DataStoreConfigState);

    const getDataStoreData: DataStoreConfigType[] = emisConfig?.length > 0
        ? emisConfig?.find((dataStore: DataStoreConfigType[]) => dataStore.key === useQuery().get("sectionType")) ?? {} as unknown as dataStoreRecord
        : {} as unknown as dataStoreRecord

    return { getDataStoreData }
}
