import { useState } from "react"

import { useFavoriteMovieStore } from "../store/context/FavoriteMovieContext"
import { useBlockedMovieStore } from "../store/context/BlockedMovieContext"

import PageSelect from "./PageSelect"
import MovieCard from "./MovieCard"

import Spinner from "./Spinner"

const MovieList = ({
    movies,
    fetchMore,
    amount,
    isLoading,
    isError,
    errorMessage,
    className,
}) => {
    const { favoriteMovies } = useFavoriteMovieStore()
    const { blockedMovies } = useBlockedMovieStore()

    const [page, setPage] = useState(0)

    const moviesToShow = movies.slice(amount * page, amount * page + amount)

    const nextPage = () => {
        if (fetchMore) fetchMore(page + 1)

        setPage((prevState) => prevState + 1)
    }

    const prevPage = () => {
        setPage((prevState) => prevState - 1)
    }

    const goToFirstPage = () => {
        setPage(0)
    }

    if (isLoading && !isError) return <Spinner />

    if (isError) return <div>something went wrong...</div>

    return movies?.length > 0 ? (
        <>
            {/* <div
                className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl mx-auto px-2 ${className}`}
            > */}
            <div
                className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mx-auto w-fit px-2 ${className}`}
            >
                {/* <div
                className={`flex flex-wrap gap-2 mx-auto justify-center max-w-6xl ${className}`}
            > */}
                {moviesToShow.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        isFavorite={
                            favoriteMovies?.filter(
                                (favoriteMovie) =>
                                    favoriteMovie._id === movie._id
                            ).length > 0
                        }
                        isBlocked={
                            blockedMovies?.filter(
                                (blockedMovie) => blockedMovie._id === movie._id
                            ).length > 0
                        }
                        movie={movie}
                    />
                ))}
            </div>
            <PageSelect
                nextPage={nextPage}
                prevPage={prevPage}
                goToFirstPage={goToFirstPage}
                page={page}
            />
        </>
    ) : (
        <div className="mx-auto w-fit mt-12 text-slate-500">it's empty</div>
    )
}
export default MovieList
