import { Route, Routes } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { Layout } from "./Layout";
import { LinkPage } from "./LinkPage";
import { Dashboard } from "./Dashboard";
import { Editor } from "./Editor";
import { Admin } from "./Admin";
import { Lounge } from "./Lounge";
import { NotFound } from "./NotFound";
import { RequireAuth } from "./RequireAuth";
import { ROLES } from '../../config/roles'
import { PersistentLogin } from "./PersistentLogin";
import { IsLoggedInComponent } from "./IsLoggedInComponent";

export function Main() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                {/* public routes */}
                <Route element={<IsLoggedInComponent />}>
                    <Route path='signin' element={<Signin />}></Route>
                    <Route path='signup' element={<Signup />}></Route>
                </Route>
                <Route path='linkpage' element={<LinkPage />}></Route>
                <Route path='unauthorized' element={<NotFound />}></Route>

                {/* Protected */}
                {/* Accessible to all */}
                <Route element={<PersistentLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]} />} >
                        <Route path='/' element={<Dashboard />}></Route>
                        <Route path='/dashboard' element={<Dashboard />}></Route>
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
                    <Route path='*' element={<NotFound />}></Route>
                </Route>

            </Route>
        </Routes >
    )
}
