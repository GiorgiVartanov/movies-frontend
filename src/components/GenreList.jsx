import Genre from "./Genre"

import { useStore } from "../store/StoreContext"

const GenreList = ({ genres }) => {
    const { chosenGenres, addSelectedGenre, removeSelectedGenre } = useStore()

    const handleOnClick = (genre) => {
        if (chosenGenres.includes(genre)) removeSelectedGenre(genre)
        else addSelectedGenre(genre)
    }

    return (
        <div className="flex flex-row px-2 justify-center gap-2 max-w-lg mx-auto mb-8 flex-wrap">
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
