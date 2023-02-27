import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { GrClose } from "react-icons/gr"
import { toast } from "react-toastify"

import { useMovieStore } from "../store/context/MovieContext"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

import Spinner from "../components/Spinner"
import GenreList from "../components/GenreList"

const Movie = () => {
    const ref = useRef()

    const { id } = useParams()

    const { getMovie, isLoading, isError, errorMessage } = useMovieStore()

    const [movie, setMovie] = useState()
    const [isImageOpened, setIsImageOpened] = useState(false)

    const openImage = () => {
        setIsImageOpened(true)
    }

    const closeImage = () => {
        setIsImageOpened(false)
    }

    useOnClickOutside(ref, closeImage)

    // const movie = getMovie(id)

    useEffect(() => {
        // const movie = movies.filter((movie) => movie?._id === id)[0]
        const movie = getMovie(id)
        setMovie(movie)
    }, [getMovie, id])

    useEffect(() => {
        if (!isError || errorMessage === "") return

        toast.error(errorMessage)
    }, [isError, errorMessage])

    if (isLoading) return <Spinner />

    const renderFullScreenImage = () => {
        return (
            <div className="absolute h-full w-full">
                <div className="absolute h-full w-full bg-slate-300/10 backdrop-blur-xss animate-appearSlow"></div>
                <div className="absolute max-w-full w-[32rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl animate-appearFast">
                    <button
                        onClick={closeImage}
                        className="absolute top-2 right-2"
                    >
                        <GrClose size={25} />
                    </button>
                    <img
                        ref={ref}
                        src={`${process.env.REACT_APP_IMAGE_BASE_URL}/original/${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>
            </div>
        )
    }

    if (!movie) return <Spinner />

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_IMAGE_BASE_URL}/original/${movie.backdrop_path})`,
                }}
                className="w-full h-full bg-top grid justify-center"
            >
                <div className="flex md:flex-row flex-col sm:gap-6 h-fit mt-8 px-3 py-3 gap-4 max-w-4xl mx-2 bg-slate-100/50 backdrop-blur-sm rounded shadow-md ">
                    <button className="w-fit mx-auto md:mx-0">
                        <img
                            onClick={openImage}
                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}/original/${movie.poster_path}`}
                            alt={movie.title}
                            className="bg-slate-200"
                            height="450px"
                            width="300px"
                        />
                    </button>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {movie.title}
                        </h1>
                        <p className="text-slate-800 sm:w-52">
                            {movie.overview}
                        </p>
                        <GenreList
                            genres={movie.genre_ids}
                            className="md:ml-0 md:pl-0 mt-auto"
                            showAlert={true}
                        />
                    </div>
                </div>
            </div>
            {isImageOpened ? renderFullScreenImage() : ""}
        </>
    )
}
export default Movie
