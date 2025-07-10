import {atom} from "recoil"

export const ProgramDataState = atom<any>({
    default: false,
    key: "program-data-state"
})