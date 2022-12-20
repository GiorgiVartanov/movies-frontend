import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"

import { useStore } from "../store/StoreContext"

import Spinner from "./Spinner"

const Header = () => {
    const { logoutUser, user } = useStore()

    const handleLogout = () => {
        logoutUser()
    }

    // if (isLoading) {
    //     return <Spinner />
    // }

    return (
        <header className="w-full bg-slate-900 px-3 py-1 flex justify-between place-center items-center mb-12">
            <h1 className="text-slate-50 text-xl px-2 py-1">
                <Link to="/">Movies</Link>
            </h1>
            <nav className="h-full">
                <ul className="flex text-slate-50 items-center">
                    {user ? (
                        <>
                            <li>
                                <NavLink
                                    to="/favorites"
                                    className="hover:text-slate-200 h-full items-center gap-1 px-2 py-1 transition-all ease-out delay-75 duration-200"
                                >
                                    favorites
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-slate-200 flex items-center gap-1 px-2 py-1 transition-all ease-out delay-75 duration-200"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/register"
                                    className="hover:text-slate-200 flex items-center gap-1 px-2 py-1 transition-all ease-out delay-75 duration-200"
                                >
                                    <FaUser /> register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/login"
                                    className="hover:text-slate-200 flex items-center gap-1 px-2 py-1 transition-all ease-out delay-75 duration-200"
                                >
                                    <FaSignInAlt /> login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
export default Header
