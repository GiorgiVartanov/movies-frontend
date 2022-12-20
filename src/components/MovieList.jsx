import MovieCard from "./MovieCard"

import { useStore } from "../store/StoreContext"

const MovieList = ({ movies, className }) => {
    const { favorites } = useStore()

    return movies?.length > 0 ? (
        <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl mx-auto px-2 ${className}`}
        >
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    isFavorite={
                        favorites?.filter(
                            (favorite) => favorite._id === movie._id
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
