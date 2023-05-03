import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useFavoriteMovieStore } from "../store/context/FavoriteMovieContext"
import { useAuthStore } from "../store/context/AuthContext"
import { useMovieStore } from "../store/context/MovieContext"

import MovieList from "../components/MovieList"

const Favorites = () => {
  const navigate = useNavigate()

  const {
    favoriteMovies,
    maximumAmountOfFavoriteMovies,
    isLoading,
    isError,
    errorMessage,
  } = useFavoriteMovieStore()
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
        maximumAmountOfMovies={maximumAmountOfFavoriteMovies}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        className="mt-8"
        emptyMessage="you have not added any movies into favorites yet"
      />
    </div>
  )
}
export default Favorites
