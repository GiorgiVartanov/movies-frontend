import { NavLink } from "react-router-dom"
import { FaSignInAlt, FaUser } from "react-icons/fa"
import { useState, useRef } from "react"
import { GiHamburgerMenu } from "react-icons/gi"

import { useOnClickOutside } from "../hooks/useOnClickOutside"

const Navbar = ({ handleLogout, isLoggedIn, className, children }) => {
  const navRef = useRef()

  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClose = () => {
    setIsOpen(false)
  }

  const handleClick = () => {
    setIsOpen((prevState) => !prevState)
  }

  useOnClickOutside(navRef, handleMenuClose)

  return (
    <nav
      ref={navRef}
      className={`${className ? className : ""}`}
    >
      <button
        onClick={handleClick}
        className={`block sm:hidden text-slate-50`}
      >
        <GiHamburgerMenu size={25} />
      </button>

      <ul
        className={`${
          isOpen ? "flex-col top-10 left-0 h-20 bg-slate-900 flex" : "hidden"
        } sm:flex-row text-slate-50 items-center w-full absolute sm:static sm:h-auto gap-0 sm:gap-1 sm:flex z-10 `}
      >
        {isLoggedIn ? (
          <>
            <li className="w-full sm:w-auto">
              <NavLink
                to="/blocklist"
                onClick={handleMenuClose}
                className="hover:text-slate-200 gap-1 px-2 py-4 sm:py-1 transition-all ease-out delay-75 duration-200 flex justify-center items-center w-full sm:w-auto bg-slate-900 text-center"
              >
                blocklist
              </NavLink>
            </li>
            <li className="w-full sm:w-auto">
              <NavLink
                to="/favorites"
                onClick={handleMenuClose}
                className="hover:text-slate-200 gap-1 px-2 py-4 sm:py-1 transition-all ease-out delay-75 duration-200 flex justify-center items-center w-full sm:w-auto bg-slate-900 text-center"
              >
                favorites
              </NavLink>
            </li>
            <li className="w-full sm:w-auto">
              <button
                onClick={() => {
                  handleLogout()
                  handleMenuClose()
                }}
                className="hover:text-slate-200 gap-1 px-2 py-4 sm:py-1 transition-all ease-out delay-75 duration-200 flex justify-center items-center w-full sm:w-auto bg-slate-900 text-center"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="w-full sm:w-auto">
              <NavLink
                to="/register"
                onClick={handleMenuClose}
                className="hover:text-slate-200 gap-1 px-2 py-4 sm:py-1 transition-all ease-out delay-75 duration-200 flex justify-center items-center w-full sm:w-auto bg-slate-900 text-center"
              >
                <FaUser /> register
              </NavLink>
            </li>
            <li className="w-full sm:w-auto">
              <NavLink
                to="/login"
                onClick={handleMenuClose}
                className="hover:text-slate-200 gap-1 px-2 py-4 sm:py-1 transition-all ease-out delay-75 duration-200 flex justify-center items-center w-full sm:w-auto bg-slate-900 text-center"
              >
                <FaSignInAlt /> login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
