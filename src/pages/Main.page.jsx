import { useMovieStore } from "../store/context/MovieContext"

import MovieList from "../components/MovieList"
import SelectGenre from "../components/SelectGenre"

const Main = () => {
  const {
    movies,
    amount,
    maximumAmountOfMovies,
    fetchMovies,
    isLoading,
    isError,
    errorMessage,
  } = useMovieStore()

  return (
    <div className="flex flex-col">
      <SelectGenre />
      <MovieList
        movies={movies}
        fetchMore={fetchMovies}
        amount={amount}
        maximumAmountOfMovies={maximumAmountOfMovies}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        emptyMessage=""
      />
    </div>
  )
}
export default Main
