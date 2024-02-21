import { Route, Routes } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { Layout } from "./Layout";
import { LinkPage } from "./LinkPage";
import { Unauthorized } from "./Unauthorized";
import { Home } from "./Home";
import { Editor } from "./Editor";
import { Admin } from "./Admin";
import { Lounge } from "./Lounge";
import { Missing } from "./Missing";
import { RequireAuth } from "../components/RequireAuth";
import { ROLES } from '../../config/roles'
import { PersistentLogin } from "../components/PersistentLogin";

export function Main() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                {/* public routes */}
                <Route path='signin' element={<Signin />}></Route>
                <Route path='signup' element={<Signup />}></Route>
                <Route path='linkpage' element={<LinkPage />}></Route>
                <Route path='unauthorized' element={<Unauthorized />}></Route>

                {/* Protected */}
                {/* Accessible to all */}
                <Route element={<PersistentLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]} />} >
                        <Route path='/' element={<Home />}></Route>
                    </Route>

                    {/* Accessible to editor only */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]} />} >
                        <Route path='editor' element={<Editor />}></Route>
                    </Route>

                    {/* Accessible to Admin only */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />} >
                        <Route path='admin' element={<Admin />}></Route>
                    </Route>

                    {/* Accessible to Admin and Editors only */}
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.EDITOR]} />} >
                        <Route path='lounge' element={<Lounge />}></Route>
                    </Route>

                    {/* Catch All */}
                    <Route path='*' element={<Missing />}></Route>
                </Route>

            </Route>
        </Routes >
    )
}
