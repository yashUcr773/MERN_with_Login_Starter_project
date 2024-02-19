import { Signin } from "./Signin";
import { Signup } from "./Signup";

export function Main() {
    return <main className="bg-gray-300 border border-black h-[100vh] flex flex-row items-center justify-center">
        {/* <Signup></Signup> */}
        <Signin></Signin>
    </main>
}