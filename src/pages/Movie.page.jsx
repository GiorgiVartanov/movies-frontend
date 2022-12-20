import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { useStore } from "../store/StoreContext"

import Spinner from "../components/Spinner"
import GenreList from "../components/GenreList"

const Movie = () => {
    const { id } = useParams()

    const { movies } = useStore()

    const [movie, setMovie] = useState()

    useEffect(() => {
        const movie = movies.filter((movie) => movie?._id === id)[0]

        setMovie(movie)
    }, [id, movies])

    if (!movie) return <Spinner />

    return (
        <div className="flex flex-col md:flex-row mt-5 px-3 gap-4 max-w-4xl mx-auto">
            <img
                src={`${process.env.REACT_APP_IMAGE_BASE_URL}/w500/${movie.poster_path}`}
                alt=""
                className=""
            />
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-slate-900">
                    {movie.title}
                </h1>
                <p className="text-slate-800">{movie.overview}</p>
                <GenreList genres={movie.genre_ids} />
            </div>
        </div>
    )
}
export default Movie
