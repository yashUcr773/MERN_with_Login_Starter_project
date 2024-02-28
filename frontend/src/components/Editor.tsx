import { Link } from "react-router-dom";

export function Editor() {
    return (
        <section className="border border-black flex flex-col gap-4 p-4 rounded-lg text-xl font-normal">
            <h1 className="font-bold text-3xl">Editors Page</h1>
            <p>You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link className="underline" to="/">Home</Link>
            </div>
        </section>
    )
}