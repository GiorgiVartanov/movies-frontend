import { toast } from "react-toastify"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useStore } from "../store/StoreContext"

import Spinner from "../components/Spinner"
import MovieList from "../components/MovieList"

const Favorites = () => {
    const navigate = useNavigate()

    const { favorites: movies, user } = useStore()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user, navigate])

    // if (isLoading) {
    //     return <Spinner />
    // }

    return (
        <div>
            <MovieList movies={movies} />
        </div>
    )
}
export default Favorites
