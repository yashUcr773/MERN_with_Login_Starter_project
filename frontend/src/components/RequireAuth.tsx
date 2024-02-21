import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../store/atoms/authAtom";
import { userAtom } from "../store/atoms/user";

export function RequireAuth({ allowedRoles }: any) {
    const location = useLocation()
    const isSignedIn = useRecoilValue(isLoggedInAtom)
    const user = useRecoilValue(userAtom)

    return (
        user?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : isSignedIn
                ? <Navigate to="/unauthorized" state={{ from: location }} replace></Navigate>
                : <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    )
}