import { Link } from "react-router-dom";

export function LinkPage() {
    return (
        <section className="border border-black flex flex-col gap-4 p-4 rounded-lg text-xl font-normal">
            <h1 className="font-bold text-3xl">Links</h1>
            <h3 className="font-bold text-2xl">Public</h3>
            <Link to="/signin" className="underline" >Login</Link>
            <Link to="/signup" className="underline" >Register</Link>
            <h3 className="font-bold text-2xl">Private</h3>
            <Link to="/" className="underline" >Home</Link>
            <Link to="/editor" className="underline" >Editors Page</Link>
            <Link to="/admin" className="underline" >Admin Page</Link>
        </section>
    )
}