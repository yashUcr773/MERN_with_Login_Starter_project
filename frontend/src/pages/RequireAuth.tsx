import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../store/atom/authAtom";

export function RequireAuth() {
    const location = useLocation()
    const isSignedIn = useRecoilValue(isLoggedInAtom)

    return (
        isSignedIn ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    )
}