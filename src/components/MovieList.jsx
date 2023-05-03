import { useState, Suspense } from "react"
import { toast } from "react-toastify"

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
  maximumAmountOfMovies,
  emptyMessage,
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

  if (isError) {
    toast.error(errorMessage)
    return
  }

  const renderMovieList = () => {
    return moviesToShow.map((movie) => (
      <MovieCard
        key={movie._id}
        isFavorite={
          favoriteMovies?.filter(
            (favoriteMovie) => favoriteMovie._id === movie._id
          ).length > 0
        }
        isBlocked={
          blockedMovies?.filter(
            (blockedMovie) => blockedMovie._id === movie._id
          ).length > 0
        }
        movie={movie}
      />
    ))
  }

  return movies?.length > 0 ? (
    <>
      <main
        className={`grid grid-cols-2 sm:grid-cols-3 place-content-center lg:grid-cols-4 xl:grid-cols-5 gap-1 mx-auto mb-4 w-fit px-2 ${className}`}
      >
        {renderMovieList()}
      </main>
      <PageSelect
        nextPage={nextPage}
        prevPage={prevPage}
        goToFirstPage={goToFirstPage}
        maximumAmountOfMovies={maximumAmountOfMovies}
        amount={amount}
        page={page}
      />
    </>
  ) : (
    <span className="mx-auto block w-fit mt-14 text-slate-500">
      {emptyMessage}
    </span>
  )
}
export default MovieList
