import { useNavigate } from "react-router-dom"

export function Header() {

    const navigate = useNavigate()

    function handleSigninClick() {
        navigate('/signin')
    }

    function handleSignupClick() {
        navigate('/signup')
    }

    function handleLogoClick() {
        navigate('/linkpage')
    }

    return <header className="bg-gray-200 border border-black h-24 flex flex-row items-center justify-between p-8">
        <span onClick={handleLogoClick} className="text-xl font-semibold cursor-pointer">Logo</span>
        <nav className="flex flex-row gap-4">
            <button onClick={() => handleSigninClick()} className="border border-black p-2 px-4 rounded-lg">Signin</button>
            <button onClick={() => handleSignupClick()} className="bg-black text-white p-2 px-4 rounded-lg">Signup</button>
        </nav>
    </header>
}