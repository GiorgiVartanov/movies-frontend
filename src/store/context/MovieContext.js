import { useContext, createContext, useEffect, useReducer } from "react"

import { movieReducer } from "../reducers/movieReducer"
import {
    saveMoviesToStore,
    setPage,
    setNewAmount,
    setIsLoading,
    setIsError,
    setErrorMessage,
    resetState,
} from "../actions/movieAction"
import { getAllMovies, getFilteredMovies } from "../../utils/services/movies"
import { useAuthStore } from "./AuthContext"
import { useGenreStore } from "./GenreContext"

export const MovieContext = createContext()

export const useMovieStore = () => useContext(MovieContext)

const initialState = {
    movies: [],
    amount: 20,
    isLoading: false,
    isError: false,
    errorMessage: "",
}

export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState)

    const { isLoggedIn, token } = useAuthStore()
    const { selectedGenres } = useGenreStore()

    useEffect(() => {
        const getMoviesForUser = async () => {
            try {
                dispatch(setIsLoading(true))
                const data = await getFilteredMovies(
                    0,
                    state.amount,
                    selectedGenres,
                    token
                )
                dispatch(saveMoviesToStore(data.data))
                dispatch(setIsLoading(false))
            } catch (error) {
                setIsError(true)
                setErrorMessage(error.message)
                dispatch(setIsLoading(false))

                console.log(error.message)
            }
        }

        const getMovies = async () => {
            try {
                dispatch(setIsLoading(true))
                const data = await getAllMovies(0, state.amount, selectedGenres)
                dispatch(saveMoviesToStore(data.data))
                dispatch(setIsLoading(false))
            } catch (error) {
                setIsError(true)
                setErrorMessage(error.message)
                dispatch(setIsLoading(false))

                console.log(error.message)
            }
        }

        if (isLoggedIn) getMoviesForUser()
        else getMovies()
    }, [
        state.blocked,
        state.user,
        state.amount,
        selectedGenres,
        isLoggedIn,
        token,
    ])

    const fetchMovies = (page) => {
        // making sure not to fetch already fetched data
        if (state.movies.length > state.amount * page) return

        const getMoviesForUser = async () => {
            try {
                dispatch(setIsLoading(true))
                const data = await getFilteredMovies(
                    page * state.amount,
                    state.amount,
                    selectedGenres,
                    token
                )
                dispatch(saveMoviesToStore([...state.movies, ...data.data]))
                dispatch(setIsLoading(false))
            } catch (error) {
                setIsError(true)
                setErrorMessage(error.message)
                dispatch(setIsLoading(false))

                console.log(error.message)
            }
        }

        const getMovies = async () => {
            try {
                dispatch(setIsLoading(true))
                const data = await getAllMovies(
                    page * state.amount,
                    state.amount,
                    selectedGenres
                )
                dispatch(saveMoviesToStore([...state.movies, ...data.data]))
                dispatch(setIsLoading(false))
            } catch (error) {
                setIsError(true)
                setErrorMessage(error.message)
                dispatch(setIsLoading(false))

                console.log(error.message)
            }
        }

        if (isLoggedIn) getMoviesForUser()
        else getMovies()
    }

    const setLastPage = (page) => {
        dispatch(setPage(page))
    }

    const setAmount = (amount) => {
        dispatch(setNewAmount(amount))
    }

    const getMovie = (movieId) => {
        const movie = state.movies.filter((movie) => movie._id === movieId)[0]
        return movie
    }

    const resetMovieState = () => {
        dispatch(resetState(initialState))
    }

    const store = {
        ...state,
        fetchMovies,
        setLastPage,
        setAmount,
        getMovie,
        resetMovieState,
    }

    return (
        <MovieContext.Provider value={store}>{children}</MovieContext.Provider>
    )
}

export default MovieProvider
