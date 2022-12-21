import { useContext, createContext, useEffect, useReducer } from "react"
import { toast } from "react-toastify"

import { reducer } from "./reducer"
import {
    saveMoviesToStore,
    saveFavoritesToStore,
    addFavoriteToStore,
    saveBlockedToStore,
    saveGenresToStore,
    setNewPage,
    setNewAmount,
    setUser,
    setSelectedGenres,
} from "./actions"
import {
    getAllMovies,
    getFilteredMovies,
    getAllFavorites,
    addFavoriteMovie,
    removeFavoriteMovie,
    getBlockedIds,
    blockMovie,
    // unblockMovie,
} from "../utils/services/movies"
import { getAllGenres } from "../utils/services/genres"
import { register, login } from "../utils/services/auth"

export const StoreContext = createContext()

export const useStore = () => useContext(StoreContext)

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    movies: [],
    favorites: [],
    blocked: [],
    genres: [],
    chosenGenres: [],
    page: 0,
    amount: 20,
    user: user ? user : null,
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.user) {
            const getMovies = async () => {
                try {
                    const data = await getFilteredMovies(
                        state.page * state.amount,
                        state.amount,
                        state.chosenGenres.join(),
                        state.user.token
                    )
                    dispatch(saveMoviesToStore(data.data))
                } catch (error) {
                    toast.error("something went wrong...  ", error.message)
                    console.log(error)
                }
            }

            getMovies()
        } else {
            const getMovies = async () => {
                try {
                    const data = await getAllMovies(
                        state.page * state.amount,
                        state.amount,
                        state.chosenGenres.join()
                    )
                    dispatch(saveMoviesToStore(data.data))
                } catch (error) {
                    toast.error("something went wrong...  ", error.message)
                    console.log(error)
                }
            }

            getMovies()
        }
    }, [state.user, state.page, state.amount, state.chosenGenres])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await getAllGenres()
                dispatch(saveGenresToStore(data.data))
            } catch (error) {
                toast.error("something went wrong...  ", error.message)
                console.log(error)
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
                    console.log(error)
                }
            }

            getFavorites()
        }
    }, [state.user])

    useEffect(() => {
        if (state.user) {
            const getBlocked = async () => {
                try {
                    const data = await getBlockedIds(user.token)
                    dispatch(saveBlockedToStore(data.data))
                } catch (error) {
                    toast.error("something went wrong...  ", error.message)
                    console.log(error)
                }
            }

            getBlocked()
        }
    }, [state.user])

    const registerUser = async (userData) => {
        try {
            const user = await register(userData)
            dispatch(setUser(user.data))
            localStorage.setItem("user", JSON.stringify(user.data))
        } catch (error) {
            toast.error("something went wrong...  ", error.message)
            console.log(error)
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
            console.log(error)
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("user")
        dispatch(setUser(null))
        dispatch(saveFavoritesToStore([]))
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
            console.log(error)
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
            console.log(error)
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

    const addBlockedMovie = async (movieId) => {
        try {
            await blockMovie(movieId, user.token)
            dispatch(saveBlockedToStore([...state.blocked, movieId]))
        } catch (error) {
            console.log(error)
        }
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
        addBlockedMovie,
    }

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export default StoreProvider
