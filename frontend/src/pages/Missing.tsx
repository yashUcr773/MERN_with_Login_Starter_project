import { Link } from "react-router-dom";

export function Missing() {
    return (
        <section className="border border-black flex flex-col gap-4 p-4 rounded-lg text-xl font-normal">
            <h1 className="font-bold text-3xl">Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link className="underline" to="/">Visit Our Homepage</Link>
            </div>
        </section>
    )
}