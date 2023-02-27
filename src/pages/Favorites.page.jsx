import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useFavoriteMovieStore } from "../store/context/FavoriteMovieContext"
import { useAuthStore } from "../store/context/AuthContext"
import { useMovieStore } from "../store/context/MovieContext"

import MovieList from "../components/MovieList"

const Favorites = () => {
    const navigate = useNavigate()

    const { favoriteMovies, isLoading, isError, errorMessage } =
        useFavoriteMovieStore()
    const { amount } = useMovieStore()

    const { isLoggedIn } = useAuthStore()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }, [isLoggedIn, navigate])

    return (
        <div>
            <MovieList
                movies={favoriteMovies}
                amount={amount}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                className="mt-8"
            />
        </div>
    )
}
export default Favorites
