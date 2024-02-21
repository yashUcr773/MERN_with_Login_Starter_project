import { useSetRecoilState } from "recoil";
import { customAxios } from "../../config/Constants";
import { accessTokenAtom } from "../store/atoms/authAtom";


export function useRefreshToken() {

    const setAccessToken = useSetRecoilState(accessTokenAtom)

    const refresh = async () => {
        const response = await customAxios.get('/auth/refresh', { withCredentials: true })
        setAccessToken(response.data.newAccessToken)
        return response.data.newAccessToken
    }
    return refresh
}