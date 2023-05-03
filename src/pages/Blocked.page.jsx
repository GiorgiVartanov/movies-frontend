import { useBlockedMovieStore } from "../store/context/BlockedMovieContext"
import { useMovieStore } from "../store/context/MovieContext"

import MovieList from "../components/MovieList"

const Blocked = () => {
  const { blockedMovies, isLoading, isError, errorMessage } =
    useBlockedMovieStore()

  const { amount } = useMovieStore()

  return (
    <div>
      <MovieList
        movies={blockedMovies}
        amount={amount}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        className="mt-8"
        emptyMessage="you have not blocked any movie yet"
      />
    </div>
  )
}

export default Blocked
