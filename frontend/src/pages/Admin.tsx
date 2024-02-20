import { Link } from "react-router-dom";
import { Employees } from "../components/Employees";

export function Admin() {
    return (
        <section className="border border-black flex flex-col gap-4 p-4 rounded-lg text-xl font-normal">
            <h1 className="font-bold text-3xl">Admins Page</h1>
            <Employees />
            <div className="flexGrow">
                <Link className="underline" to="/">Home</Link>
            </div>
        </section>
    )
}
