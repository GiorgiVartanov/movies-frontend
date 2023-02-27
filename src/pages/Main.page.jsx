import { useMovieStore } from "../store/context/MovieContext"

import MovieList from "../components/MovieList"
import PageSelect from "../components/PageSelect"
import SelectGenre from "../components/SelectGenre"
import Spinner from "../components/Spinner"

const Main = () => {
    const { movies, amount, fetchMovies, isLoading, isError, errorMessage } =
        useMovieStore()

    return (
        <div>
            <SelectGenre />
            <MovieList
                movies={movies}
                fetchMore={fetchMovies}
                amount={amount}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
            />
            {/* <PageSelect /> */}
        </div>
    )
}
export default Main
