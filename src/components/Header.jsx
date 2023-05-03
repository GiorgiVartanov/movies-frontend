import { Link, NavLink } from "react-router-dom"
import { FaSignInAlt, FaUser } from "react-icons/fa"

import { useAuthStore } from "../store/context/AuthContext"
import { useMovieStore } from "../store/context/MovieContext"
import { useBlockedMovieStore } from "../store/context/BlockedMovieContext"

import Navbar from "./Navbar"

const Header = () => {
  const { logoutUser, isLoggedIn } = useAuthStore()
  const { resetMovieState } = useMovieStore()
  const { resetBlockedMovieState } = useBlockedMovieStore()

  const handleLogout = () => {
    resetMovieState()
    resetBlockedMovieState()
    logoutUser()
  }

  return (
    <header className="w-full bg-slate-900 px-3 py-1 flex justify-between place-center items-center">
      <h1 className="text-slate-50 text-xl px-2 py-1">
        <Link to="/">Movies</Link>
      </h1>
      <Navbar
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
    </header>
  )
}
export default Header
