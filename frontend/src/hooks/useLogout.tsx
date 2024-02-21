import { customAxios } from "../../config/Constants";
import { useSetCurrentSession } from "../hooks/useSetCurrentSession";
import { defaultUser } from "../../config/defaults";
import { useNavigate } from "react-router-dom";

interface useLogoutProps {
    toLink?: string
}

export function useLogout() {

    const navigate = useNavigate();
    const setSession = useSetCurrentSession()

    async function logout({ toLink }: useLogoutProps) {
        try {
            const response = await customAxios('/auth/logout', { withCredentials: true })
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            setSession({ accessToken: "", userData: defaultUser })
            if (toLink) {
                navigate(toLink)
            } else {
                navigate('/linkpage')
            }
        }
    }

    return logout

}