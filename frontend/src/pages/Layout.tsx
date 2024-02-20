import { Outlet } from "react-router-dom";

export function Layout() {
    return <main className="App bg-gray-300 border border-black h-[100vh] flex flex-row items-center justify-center">
        <Outlet />
    </main>
}