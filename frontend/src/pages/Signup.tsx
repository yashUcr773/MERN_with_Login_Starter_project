import { useEffect, useState } from "react";
import { Info } from "../assets/Info";
import { CONSTANTS } from "../../config/Constants"
import { Correct } from "../assets/Correct";
import { Incorrect } from "../assets/Incorrect";
import { Loader } from "./Loader";

export function Signup() {

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)

    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)

    const [confirmPWD, setConfirmPWD] = useState("")
    const [validconfirmPWD, setValidconfirmPWD] = useState(false)

    const [err, setErr] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        setErr("")
        setValidName(CONSTANTS.USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setErr("")
        setValidPassword(CONSTANTS.PWD_REGEX.test(password));
        setValidconfirmPWD(password == confirmPWD)
    }, [password, confirmPWD])

    function handleSubmit(e: any) {
        e.preventDefault()
        if (!CONSTANTS.USER_REGEX.test(user)) {
            setErr('Username does not match format')
            return setValidName(CONSTANTS.USER_REGEX.test(user));
        }
        if (!CONSTANTS.PWD_REGEX.test(password)) {
            setErr('Password does not match format')
            return setValidPassword(CONSTANTS.PWD_REGEX.test(password));
        }
        if (password != confirmPWD) {
            setErr('Passwords do not match')
            return setValidconfirmPWD(password == confirmPWD)
        }
        console.log(user, password, confirmPWD)
        setShowLoader(true)
        setTimeout(() => {
            setShowLoader(false)
        }, 5000)
    }

    return <section className="flex flex-col items-center justify-center h-full w-11/12 text-md font-normal">
        <div className="signup-form flex flex-col gap-2 p-8 rounded-lg items-center justify-center w-full sm:w-[500px] border border-black">
            <div className="form-header">
                <h1 className="text-3xl font-bold">Sign up</h1>
            </div>
            <div className="form-body w-full">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="form-input w-full">

                        <label htmlFor="username" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Username:
                            {!user ? "" : !validName ? <Incorrect color={'red'} /> : <Correct color={'green'} />}
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            placeholder="Enter username"
                        ></input>
                        <p id="uidnote" className={`${user && !validName ? 'block' : 'hidden'} border border-black my-2 bg-gray-800 text-sm font-normal p-4 rounded-lg text-white`}>
                            <Info />
                            4 to 24 characters.
                            Must begin with a letter.
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>
                    <div className="form-input w-full">

                        <label htmlFor="password" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Password:
                            {!password ? "" : !validPassword ? <Incorrect color={'red'} /> : <Correct color={'green'} />}
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            placeholder="Enter password"
                        ></input>
                        <p id="pwdnote" className={`${password && !validPassword ? 'block' : 'hidden'} border border-black my-2 bg-gray-800 text-sm font-normal p-4 rounded-lg text-white`}>
                            <Info />
                            8 to 24 characters.
                            Must include uppercase and lowercase letters, a number and a special character.
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    </div>
                    <div className="form-input w-full">

                        <label htmlFor="confirmPWD" className="flex flex-row gap-2 items-center justify-start h-full my-2 font-semibold">
                            Confirm Password:
                            {!confirmPWD ? "" : !validconfirmPWD ? <Incorrect color={'red'} /> : <Correct color={'green'} />}
                        </label>
                        <input
                            className="p-4 bg-gray-100 font-normal rounded-md w-full"
                            type="password"
                            id="confirmPWD"
                            onChange={(e) => setConfirmPWD(e.target.value)}
                            value={confirmPWD}
                            required
                            aria-invalid={validconfirmPWD ? "false" : "true"}
                            aria-describedby="confirmpwdnote"
                            placeholder="Enter password again"
                        ></input>
                        <p id="confirmpwdnote" className={`${confirmPWD && !validconfirmPWD ? 'block' : 'hidden'} border border-black my-2 bg-gray-800 text-sm font-normal p-4 rounded-lg text-white`}>
                            <Info />
                            Must match the first password input field.
                        </p>
                    </div>
                    <p className="text-red-600 test-lg font-semibold mt-4">{err}</p>
                    <button className="border border-black p-4 rounded-xl bg-black text-white w-48 mt-4 flex flex-row items-center justify-center gap-4">Sign up {showLoader ? <Loader fullPage={false} /> : ""}</button>
                </form>

            </div>
            <div className="form-footer mt-2">
                <span>Already registered? <span className="underline cursor-pointer font-semibold">Sign in</span></span>
            </div>
        </div>
    </section>
}