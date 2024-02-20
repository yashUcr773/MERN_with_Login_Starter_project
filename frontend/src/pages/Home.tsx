import { Link, useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate();

    const logout = async () => {
        navigate('/linkpage');
    }

    return <section className="border border-black flex flex-col gap-4 p-4 rounded-lg text-xl font-normal">
        <h1 className="font-bold text-3xl">Home</h1>
        <h3 className="font-semibold text-xl">You are logged in</h3>
        <Link to="/editor" className="underline">Go to Editor only page</Link>
        <Link to="/admin" className="underline">Go to admin only page</Link>
        <Link to="/lounge" className="underline">Go to lounge page</Link>
        <Link to="/linkpage" className="underline">Go to links page</Link>
        <button onClick={() => logout()} className="border border-black bg-black text-white text-lg font-semibold p-2 px-4 rounded-md">Sign out</button>
    </section>
}