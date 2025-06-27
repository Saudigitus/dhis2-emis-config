import { atom } from "recoil";
import { DataStoreConfigType } from "../types/dataStore/dataStoreConfigType";

export const DataStoreConfigState = atom<DataStoreConfigType>({
    key: "data-store-config-state",
    default: undefined
})