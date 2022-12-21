import { toast } from "react-toastify"

import { useStore } from "../store/StoreContext"

import Genre from "./Genre"

const GenreList = ({ genres, className, showAlert }) => {
    const { chosenGenres, addSelectedGenre, removeSelectedGenre } = useStore()

    const handleOnClick = (genre) => {
        if (chosenGenres.includes(genre)) {
            removeSelectedGenre(genre)
            if (showAlert) toast.success(`${genre} was removed from search`)
        } else {
            addSelectedGenre(genre)
            if (showAlert) toast.success(`${genre} was added to search`)
        }
    }

    return (
        <div
            className={`flex flex-row px-2 justify-center gap-2 max-w-lg mx-auto mb-8 flex-wrap ${className}`}
        >
            {genres.map((genre) => (
                <Genre
                    key={genre}
                    isSelected={chosenGenres.includes(genre)}
                    onClick={() => {
                        handleOnClick(genre)
                    }}
                    genre={genre}
                />
            ))}
        </div>
    )
}
export default GenreList
