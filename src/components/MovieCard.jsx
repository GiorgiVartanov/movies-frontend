import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { TbStar, TbStarOff } from "react-icons/tb"
import { IoStar } from "react-icons/io5"
import { BiLinkExternal, BiBlock } from "react-icons/bi"
import { toast } from "react-toastify"

import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useFavoriteMovieStore } from "../store/context/FavoriteMovieContext"
import { useBlockedMovieStore } from "../store/context/BlockedMovieContext"
import { useAuthStore } from "../store/context/AuthContext"

import CardButton from "./CardButton"

const MovieCard = ({ movie, isFavorite, isBlocked, className }) => {
    const { isLoggedIn } = useAuthStore()
    const { addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovieStore()
    const { blockMovie, unblockMovie } = useBlockedMovieStore()

    const [isActive, setIsActive] = useState(false)

    const ref = useRef()

    const handleClick = () => {
        setIsActive(true)
    }

    const handleClickOutside = () => {
        setIsActive(false)
    }

    const handleFavorite = () => {
        if (isFavorite) removeFavoriteMovie(movie._id)
        else addFavoriteMovie(movie._id)
    }

    const handleBlock = () => {
        blockMovie(movie._id)
        // setIsActive(false)
        toast.success("movie blocked")
    }

    const handleUnblock = () => {
        unblockMovie(movie._id)
        toast.success("movie unblocked")
    }

    useOnClickOutside(ref, handleClickOutside)

    const renderCardActivePanel = () => {
        return (
            <div className="absolute bg-slate-400/20 h-full w-full animate-appear">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 bg-slate-200/80 px-2 py-1 flex items-center text-slate-700 ">
                    <CardButton onClick={handleBlock}>
                        <BiBlock size={30} />
                    </CardButton>
                    <CardButton onClick={handleFavorite}>
                        {isFavorite ? (
                            <TbStarOff size={30} />
                        ) : (
                            <TbStar size={30} />
                        )}
                    </CardButton>

                    <Link
                        to={`/movie/${movie._id}`}
                        className="hover:text-slate-900 delay-75 duration-200 ease-out"
                    >
                        <BiLinkExternal size={30} />
                    </Link>
                </div>
            </div>
        )
    }

    const renderStar = () => {
        return (
            <div
                className={`absolute bg-slate-900  px-0.5 pt-2 pb-1 top-0 left-2 ease-out delay-75 duration-100 shadow-sm shadow-slate-900 ${
                    isActive ? "-top-0.5 " : ""
                }`}
            >
                <IoStar
                    size={20}
                    color="white"
                />
            </div>
        )
    }

    const renderCardImage = () => {
        return (
            <div
                className={`relative overflow-hidden bg-no-repeat bg-cover ease-out delay-75 duration-200`}
            >
                {isBlocked ? (
                    <div
                        className={`h-full w-full absolute ease-in duration-200 bg-slate-800/25 backdrop-blur-sm group-hover:backdrop-blur-xs ${
                            isActive ? "backdrop-blur-xs" : ""
                        }`}
                    >
                        {isActive ? (
                            <button
                                onClick={handleUnblock}
                                className="text-slate-100 h-full w-full text-2xl font-semibold bg-slate-700/50"
                            >
                                unblock
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

                <img
                    src={
                        process.env.REACT_APP_IMAGE_BASE_URL +
                        "/w300" +
                        movie.poster_path
                    }
                    alt={movie.title}
                    className={`bg-slate-200 shadow-slate-900 transition duration-300 ease-in-out ${
                        isActive && !isBlocked ? "scale-105" : ""
                    }  ${
                        !isBlocked
                            ? "group-hover:shadow-xl group-hover:scale-105 group-active:scale-105"
                            : ""
                    } `}
                    width={220}
                    height={330}
                />
            </div>
        )
    }

    const renderCardContent = () => {
        return (
            <>
                {renderCardImage()}
                <p className="text-sm">
                    {movie.title.slice(0, 29) === movie.title
                        ? movie.title
                        : movie.title.slice(0, 29) + "..."}
                </p>
                {isActive && !isBlocked ? renderCardActivePanel() : ""}
                {isFavorite ? renderStar() : ""}
            </>
        )
    }

    const renderCard = () => {
        if (isLoggedIn)
            return (
                <div
                    ref={ref}
                    className={`relative flex flex-col gap-1 group w-fit ${
                        className ? className : ""
                    }`}
                    onClick={handleClick}
                >
                    {renderCardContent()}
                </div>
            )
        else
            return (
                <Link
                    to={`/movie/${movie._id}`}
                    className={`relative flex flex-col gap-1 group w-fit ${
                        className ? className : ""
                    }`}
                >
                    {renderCardContent()}
                </Link>
            )
    }

    return renderCard()
}
export default MovieCard
