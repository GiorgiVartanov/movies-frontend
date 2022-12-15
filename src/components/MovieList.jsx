import { useSelector } from "react-redux"

import MovieCard from "./MovieCard"

const MovieList = ({ movies, className }) => {
    const { favorites } = useSelector((state) => state.favorite)

    return movies?.length > 0 ? (
        <div
            className={`grid grid-cols-2 md:grid-cols-3 mt-12 lg:grid-cols-4 gap-2 max-w-4xl mx-auto px-2 ${className}`}
        >
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    isFavorite={
                        favorites.filter(
                            (favoriteMovie) => favoriteMovie._id === movie._id
                        ).length > 0
                    }
                    movie={movie}
                />
            ))}
        </div>
    ) : (
        <div className="mx-auto w-fit mt-12 text-slate-500">it's empty</div>
    )
}
export default MovieList
