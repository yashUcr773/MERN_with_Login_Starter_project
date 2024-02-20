import { useEffect, useState } from "react"
import { Loader } from "./Loader"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { CONSTANTS } from "../../config/Constants";
import { useSetRecoilState } from "recoil";
import { accessTokenAtom, isLoggedInAtom } from "../store/atom/authAtom";
import { userAtom } from "../store/atom/user";

export function Signin() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)
    const setAccessToken = useSetRecoilState(accessTokenAtom)
    const setUser = useSetRecoilState(userAtom)

    useEffect(() => {
        setErr("")
    }, [username, password])

    async function handleSubmit(e: any) {
        e.preventDefault()
        setShowLoader(true)
        try {
            const response = await axios.post(CONSTANTS.APIBASEURL + '/auth/login', { username, password })
            const { accessToken, ...user } = response.data.user
            setIsLoggedIn(true)
            setAccessToken(accessToken)
            setUser(user)
            navigate('/')

        } catch (e: any) {
            setIsLoggedIn(false)
            setAccessToken(null)
            setUser(null)
            setErr(e.response.data.message)
            console.log(e)
        }
        finally {
            setShowLoader(false)
        }
    }

    return <section className="flex flex-col items-center justify-center h-full w-11/12 text-md font-normal">
        <div className="signup-form flex flex-col gap-2 p-8 rounded-lg items-center justify-center w-full sm:w-[500px] border border-black">
            <div className="form-header">
                <h1 className="text-3xl font-bold">Sign in</h1>
            </div>

            <div className="form-body w-full">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">

                    <div className="form-input w-full">

                        <label htmlFor="username" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Username:
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            placeholder="Enter Name"
                        ></input>
                    </div>

                    <div className="form-input w-full">

                        <label htmlFor="password" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Password:
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder="Enter Password"
                        ></input>
                    </div>

                    <p className={`${err ? "bg-red-400" : ""} rounded-lg text-white test-lg font-semibold mt-4 p-2 w-full text-center`}>{err}</p>
                    <button className="border border-black p-4 rounded-xl bg-black text-white w-48 mt-4 flex flex-row items-center justify-center gap-4">Sign in {showLoader ? <Loader fullPage={false} /> : ""}</button>
                </form>

            </div>
            <div className="form-footer mt-2">
                <span>Already registered?
                    <span onClick={() => { navigate('/signup') }} className="underline cursor-pointer font-semibold">
                        Sign up
                    </span>
                </span>
            </div>
        </div>
    </section>
}