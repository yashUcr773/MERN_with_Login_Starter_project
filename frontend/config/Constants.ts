import axios from "axios"

export const CONSTANTS = {
    USER_REGEX: /^[A-z][A-z0-9-_]{3,23}$/,
    PWD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    APIBASEURL: "http://localhost:3000"
}

export const customAxios = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
})

export const customAxiosPrivate = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
    headers: { 'Content-Type': 'applications/json' },
    withCredentials: true
})
