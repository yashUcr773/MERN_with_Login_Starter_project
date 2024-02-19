import { atom } from "recoil";

export const isLoggedInAtom = atom({
    key: "isLoggedInAtom",
    default: false as boolean
})

export const accessTokenAtom = atom({
    key: "accessTokenAtom",
    default: null as string | null
})