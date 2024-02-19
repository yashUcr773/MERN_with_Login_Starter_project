import { atom } from "recoil";
import { defaultUser } from '../../../config/defaults'
import { defaultUserInterface } from "../../../config/types";

export const userAtom = atom({
    key: "userAtom",
    default: null as defaultUserInterface | null
})