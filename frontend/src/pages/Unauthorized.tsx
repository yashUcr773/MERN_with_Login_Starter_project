import { useNavigate } from "react-router-dom";

export function Unauthorized() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="border border-black flex flex-col gap-4 p-4 rounded-lg text-xl font-normal">
            <h1 className="font-bold text-3xl">Unauthorized</h1>
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button className="border border-black bg-black text-white text-lg font-semibold p-2 px-4 rounded-md" onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}