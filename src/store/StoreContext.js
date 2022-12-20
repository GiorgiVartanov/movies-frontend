import { useContext, createContext, useEffect, useReducer } from "react"
import { toast } from "react-toastify"

import { reducer } from "./reducer"
import {
    saveMoviesToStore,
    saveFavoritesToStore,
    addFavoriteToStore,
    saveGenresToStore,
    setNewPage,
    setNewAmount,
    setUser,
    setSelectedGenres,
} from "./actions"
import {
    getAllMovies,
    getAllFavorites,
    addFavoriteMovie,
    removeFavoriteMovie,
} from "../utils/services/movies"
import { getAllGenres } from "../utils/services/genres"
import { register, login } from "../utils/services/auth"

export const StoreContext = createContext()

export const useStore = () => useContext(StoreContext)

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    movies: [],
    favorites: [],
    genres: [],
    chosenGenres: [],
    page: 0,
    amount: 20,
    user: user ? user : null,
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await getAllMovies(
                    state.page * state.amount,
                    state.amount,
                    state.chosenGenres.join()
                )
                dispatch(saveMoviesToStore(data.data))
            } catch (error) {
                toast("something went wrong...  ", error.message)
            }
        }

        getMovies()
    }, [state.page, state.amount, state.chosenGenres])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await getAllGenres()
                dispatch(saveGenresToStore(data.data))
            } catch (error) {
                toast.error("something went wrong...  ", error.message)
            }
        }

        getMovies()
    }, [])

    useEffect(() => {
        if (state.user) {
            const getFavorites = async () => {
                try {
                    const data = await getAllFavorites(user.token)
                    dispatch(saveFavoritesToStore(data.data))
                } catch (error) {
                    toast.error("something went wrong...  ", error.message)
                }
            }

            getFavorites()
        }
    }, [state.user])

    const registerUser = async (userData) => {
        try {
            const user = await register(userData)
            dispatch(setUser(user.data))
            localStorage.setItem("user", JSON.stringify(user.data))
        } catch (error) {
            toast.error("something went wrong...  ", error.message)
        }
    }

    const loginUser = async (userData) => {
        try {
            const user = await login(userData)
            dispatch(setUser(user.data))
            localStorage.setItem("user", JSON.stringify(user.data))
        } catch (error) {
            if (error.response.status === 400) toast.error("wrong password")
            else toast.error("something went wrong...  ", error.message)
        }
    }

    const logoutUser = () => {
        dispatch(setUser(null))
        dispatch(saveFavoritesToStore([]))
        localStorage.removeItem("user")
    }

    const addFavorite = async (movieId) => {
        try {
            await addFavoriteMovie(movieId, user.token)
            dispatch(
                addFavoriteToStore(
                    state.movies.filter((movie) => movie._id === movieId)[0]
                )
            )
            toast.success("successfully added movie to favorites")
        } catch (error) {
            toast.error("something went wrong...", error.message)
        }
    }

    const removeFavorite = async (movieId) => {
        try {
            await removeFavoriteMovie(movieId, user.token)
            dispatch(
                saveFavoritesToStore(
                    state.favorites.filter((movie) => movie._id !== movieId)
                )
            )
            toast.success("successfully removed movie to favorites")
        } catch (error) {
            toast.error("something went wrong...", error.message)
        }
    }

    const setPage = (page) => {
        dispatch(setNewPage(page))
    }

    const setAmount = (amount) => {
        dispatch(setNewAmount(amount))
    }

    const addSelectedGenre = (genre) => {
        if (store.chosenGenres.includes(genre)) return
        dispatch(setSelectedGenres([...state.chosenGenres, genre]))
    }

    const removeSelectedGenre = (genre) => {
        if (!store.chosenGenres.includes(genre)) return
        dispatch(
            setSelectedGenres([
                ...state.chosenGenres.filter(
                    (chosenGenre) => chosenGenre !== genre
                ),
            ])
        )
    }

    const store = {
        ...state,
        dispatch,
        registerUser,
        loginUser,
        logoutUser,
        setPage,
        setAmount,
        addSelectedGenre,
        removeSelectedGenre,
        addFavorite,
        removeFavorite,
    }

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export default StoreProvider
