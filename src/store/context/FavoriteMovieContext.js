import { useContext, createContext, useEffect, useReducer } from "react"

import { favoriteMovieReducer } from "../reducers/favoriteMovieReducer"
import {
    saveFavoritesToStore,
    setIsLoading,
    setIsError,
    setErrorMessage,
} from "../actions/favoriteMovieAction"
import {
    getAllFavorites,
    addFavorite,
    removeFavorite,
} from "../../utils/services/favoriteMovies"
import { useAuthStore } from "./AuthContext"

export const FavoriteMovieContext = createContext()

export const useFavoriteMovieStore = () => useContext(FavoriteMovieContext)

const initialState = {
    favoriteMovies: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
}

export const FavoriteMovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoriteMovieReducer, initialState)

    const { isLoggedIn, token } = useAuthStore()

    useEffect(() => {
        const getFavoriteMovies = async () => {
            try {
                dispatch(setIsLoading(true))
                const data = await getAllFavorites(token)
                dispatch(saveFavoritesToStore(data.data))
                dispatch(setIsLoading(false))
            } catch (error) {
                dispatch(setErrorMessage(error.message))
                dispatch(setIsError(true))
                dispatch(setIsLoading(false))
            }
        }

        if (!isLoggedIn) {
            dispatch(saveFavoritesToStore([]))
        } else {
            getFavoriteMovies()
        }
    }, [isLoggedIn, token])

    const addFavoriteMovie = async (movieId) => {
        if (!isLoggedIn) return

        try {
            const newFavoriteMovie = await addFavorite(movieId, token)
            dispatch(
                saveFavoritesToStore([
                    ...state.favoriteMovies,
                    newFavoriteMovie.data,
                ])
            )
        } catch (error) {
            dispatch(setErrorMessage(error.message))
            dispatch(setIsError(true))
        }
    }

    const removeFavoriteMovie = async (movieId) => {
        if (!isLoggedIn) return

        try {
            await removeFavorite(movieId, token)
            dispatch(
                saveFavoritesToStore(
                    state.favoriteMovies.filter(
                        (favoriteMovie) => favoriteMovie._id !== movieId
                    )
                )
            )
        } catch (error) {
            dispatch(setIsError(true))
            dispatch(setErrorMessage(error.message))
        }
    }

    const store = {
        ...state,
        addFavoriteMovie,
        removeFavoriteMovie,
    }

    return (
        <FavoriteMovieContext.Provider value={store}>
            {children}
        </FavoriteMovieContext.Provider>
    )
}

export default FavoriteMovieProvider
