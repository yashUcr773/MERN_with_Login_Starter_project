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
import { RequireAuth } from "./RequireAuth";

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
                <Route element={<RequireAuth />}>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='editor' element={<Editor />}></Route>
                    <Route path='admin' element={<Admin />}></Route>
                    <Route path='lounge' element={<Lounge />}></Route>
                </Route>

                {/* Catch All */}
                <Route path='*' element={<Missing />}></Route>

            </Route>
        </Routes>
    )
}
