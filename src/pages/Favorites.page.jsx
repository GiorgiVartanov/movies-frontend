import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getFavorites, resetState } from "../features/favorites/favoritesSlice"

import Spinner from "../components/Spinner"
import MovieList from "../components/MovieList"

const Favorites = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { favorites, isLoading, isError, message } = useSelector(
        (state) => state.favorite
    )

    const { movies } = useSelector((state) => state.movie)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate("/")
        }

        dispatch(getFavorites())
    }, [user, isError, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            {/* <MovieList movies={movies.results} /> */}
            <div>
                {favorites?.length > 0
                    ? favorites.map((movie) => (
                          <div key={movie.id}>{movie.id}</div>
                      ))
                    : "empty"}
            </div>
        </div>
    )
}
export default Favorites
