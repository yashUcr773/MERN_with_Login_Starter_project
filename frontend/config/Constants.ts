import axios from "axios";

export const CONSTANTS = {
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,64}$/,
    PWD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    // APIBASEURL: "https://www.digitaldime.win/",
    // APIBASEURL: "http://192.168.1.77:3000/",
    APIBASEURL: "http://localhost:3000/",
    AUTH: {
        BASE: "/auth",
        POST_SIGNUP: function () {
            return `${this.BASE}/signup`;
        },
        POST_SIGNIN: function () {
            return `${this.BASE}/signin`;
        },
        GET_REFRESH: function () {
            return `${this.BASE}/refresh`;
        },
        GET_LOGOUT: function () {
            return `${this.BASE}/signout`;
        },
    },
    USER: {
        BASE: "/api/v1/users",
        GET_ALL: function () {
            return `${this.BASE}`;
        },
        GET_BY_ID: function (id: string) {
            return `${this.BASE}/id/${id}`;
        },
        GET_BY_FILTER: function (filter: string) {
            return `${this.BASE}/filter?mask=${filter}`;
        },
        PUT_USER: function () {
            return `${this.BASE}`;
        },
    },
    EMPLOYEES: {
        BASE: "/api/v1/employees",
        GET_ALL_EMPLOYEES: function () {
            return `${this.BASE}`;
        },
        POST_EMPLOYEE: function () {
            return `${this.BASE}`;
        },
        PUT_EMPLOYEE: function () {
            return `${this.BASE}`;
        },
        DELETE_EMPLOYEE: function () {
            return `${this.BASE}`;
        },
        GET_BY_FILTER: function (filter: string) {
            return `${this.BASE}/filter?mask=${filter}`;
        },
        GET_BY_ID: function (id: string) {
            return `${this.BASE}/id/${id}`;
        },
    },
};

export const customAxios = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
});

export const customAxiosPrivate = axios.create({
    baseURL: CONSTANTS.APIBASEURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
