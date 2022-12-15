import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { getMovies, resetState } from "../features/movies/movieSlice"
import {
    getFavorites,
    resetState as resetFavoritesState,
} from "../features/favorites/favoritesSlice"

import Spinner from "../components/Spinner"
import MovieList from "../components/MovieList"

const Main = () => {
    const dispatch = useDispatch()

    const { movies, isLoading, isError, errorMessage } = useSelector(
        (state) => state.movie
    )

    // const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMovies({ offset: 0, amount: 20 }))

        dispatch(getFavorites())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <MovieList movies={movies} />
        </div>
    )
}
export default Main
