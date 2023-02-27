import { useContext, createContext, useReducer } from "react"

import { authReducer } from "../reducers/authReducer"
import {
    setUser,
    setToken,
    setIsLoggedIn,
    setIsLoading,
    setIsError,
    setErrorMessage,
} from "../actions/authAction"
import { register, login } from "../../utils/services/auth"

export const AuthContext = createContext()

export const useAuthStore = () => useContext(AuthContext)

const user = JSON.parse(localStorage.getItem("user"))
const token = JSON.parse(localStorage.getItem("token"))
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))

const initialState = {
    isLoggedIn: isLoggedIn ? isLoggedIn : false,
    user: user ? user : null,
    token: token ? token : null,
    isLoading: false,
    isError: false,
    errorMessage: "",
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async (userData) => {
        try {
            dispatch(setIsLoading(true))
            const data = await register(userData)
            const { user, token } = data.data
            dispatch(setUser(user))
            dispatch(setToken(token))
            dispatch(setIsLoggedIn(true))
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            dispatch(setIsLoading(false))
        } catch (error) {
            dispatch(setIsError(true))
            dispatch(
                setErrorMessage(error?.response?.data?.message || error.message)
            )
            dispatch(setIsLoading(false))
        }
    }

    const loginUser = async (userData) => {
        try {
            dispatch(setIsLoading(true))
            const data = await login(userData)
            const { user, token } = data.data
            dispatch(setUser(user))
            dispatch(setToken(token))
            dispatch(setIsLoggedIn(true))
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            dispatch(setIsLoading(false))
        } catch (error) {
            dispatch(setIsError(true))
            dispatch(
                setErrorMessage(error?.response?.data?.message || error.message)
            )
            dispatch(setIsLoading(false))
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.setItem("isLoggedIn", JSON.stringify(false))
        dispatch(setIsLoggedIn(false))
        dispatch(setToken(null))
        dispatch(setUser(null))
    }

    const store = {
        ...state,
        registerUser,
        loginUser,
        logoutUser,
    }

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export default AuthProvider
