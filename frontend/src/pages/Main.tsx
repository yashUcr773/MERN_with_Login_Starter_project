import { Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export function Main() {
    return <main className="bg-gray-300 border border-black h-[100vh] flex flex-row items-center justify-center">
        <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path='*' element={<Navigate to="/signin" replace />}></Route>
        </Routes>
    </main>
}