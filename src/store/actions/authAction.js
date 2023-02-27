import {
    SET_USER,
    SET_TOKEN,
    SET_IS_LOGGED_IN,
    SET_LOADING,
    SET_ERROR,
    SET_ERROR_MESSAGE,
} from "../actionTypes"

export const setUser = (user) => ({
    payload: user,
    type: SET_USER,
})

export const setToken = (token) => ({
    payload: token,
    type: SET_TOKEN,
})

export const setIsLoggedIn = (isLoggedIn) => ({
    payload: isLoggedIn,
    type: SET_IS_LOGGED_IN,
})

export const setIsLoading = (isLoading) => ({
    payload: isLoading,
    type: SET_LOADING,
})

export const setIsError = (isError) => ({
    payload: isError,
    type: SET_ERROR,
})

export const setErrorMessage = (errorMessage) => ({
    payload: errorMessage,
    type: SET_ERROR_MESSAGE,
})
