import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { TbStar, TbStarOff } from "react-icons/tb"
import { IoStar } from "react-icons/io5"
import { BiLinkExternal } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { addFavorite } from "../features/favorites/favoritesSlice"

const MovieCard = ({ movie, isFavorite, className }) => {
    const dispatch = useDispatch()

    const [isActive, setIsActive] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    const ref = useRef()

    const handleClick = () => {
        setIsActive(true)
    }

    const handleClickOutside = () => {
        setIsActive(false)
    }

    const handleMouseEnter = () => {
        setIsButtonHovered(true)
    }

    const handleMouseLeave = () => {
        setIsButtonHovered(false)
    }

    const handleAddToFavorite = () => {
        console.log(`adding ${movie._id} to favorites`)
        dispatch(addFavorite(movie._id))
    }

    useOnClickOutside(ref, handleClickOutside)

    const renderCardActivePanel = () => {
        return (
            <div className="absolute bg-slate-400/20 h-full w-full animate-appear">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 bg-slate-200/80 px-2 py-1 flex items-center text-slate-700 ">
                    <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleAddToFavorite}
                        className="hover:text-slate-900 delay-75 duration-200 ease-out"
                    >
                        {isFavorite ? (
                            isButtonHovered ? (
                                <TbStarOff size={30} />
                            ) : (
                                <TbStar
                                    fill="#334155"
                                    size={30}
                                />
                            )
                        ) : (
                            <TbStar size={30} />
                        )}
                    </button>
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
                className={`absolute bg-slate-800 group-hover:-top-0.5 px-0.5 pt-2 pb-1 top-0 left-2 ease-out delay-75 duration-100 shadow-sm shadow-slate-900 ${
                    isActive ? "-top-0.5" : ""
                }`}
            >
                <IoStar
                    size={20}
                    color="white"
                />
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className={`relative flex flex-col gap-1 group ${
                className ? className : ""
            }`}
            onClick={handleClick}
        >
            <img
                src={
                    process.env.REACT_APP_IMAGE_BASE_URL +
                    "/w300" +
                    movie.poster_path
                }
                alt={movie.title}
                className="group-hover:shadow-xl"
            />
            <p className="text-sm">{movie.title}</p>
            {isActive ? renderCardActivePanel() : ""}
            {isFavorite ? renderStar() : ""}
        </div>
    )
}
export default MovieCard
