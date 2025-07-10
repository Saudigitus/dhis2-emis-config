import { atom } from "recoil"

export const ProgramLoaderState = atom<boolean>({
    default: false,
    key: "program-loader-state"
})