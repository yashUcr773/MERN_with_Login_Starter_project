import { useEffect } from "react";
import { customAxiosPrivate } from "../../config/Constants";
import { useRefreshToken } from "./useRefreshToken";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../store/atom/authAtom";

export function useAxiosPrivate() {
    const refresh = useRefreshToken()
    const accessToken = useRecoilValue(accessTokenAtom)


    useEffect(() => {

        const requestIntercept = customAxiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config
            }, (error) => Promise.reject(error)
        )


        const responseIntercept = customAxiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return customAxiosPrivate(prevRequest)
                }
                Promise.reject(error)
            }
        )
        return () => {
            customAxiosPrivate.interceptors.response.eject(requestIntercept)
            customAxiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [])


    return customAxiosPrivate

}