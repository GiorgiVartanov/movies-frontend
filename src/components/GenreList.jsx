import { toast } from "react-toastify"

import { useGenreStore } from "../store/context/GenreContext"

import Genre from "./Genre"

const GenreList = ({ genres, showAlert, className }) => {
  const { selectedGenres, selectGenre, unselectGenre } = useGenreStore()

  const handleOnClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      unselectGenre(genre)
      if (showAlert) toast.success(`${genre} was removed from search`)
    } else {
      selectGenre(genre)
      if (showAlert) toast.success(`${genre} was added to search `)
    }
  }

  return (
    <div
      className={`flex flex-row justify-left gap-2  flex-wrap  ${className}`}
    >
      {genres.map((genre) => (
        <Genre
          key={genre}
          isSelected={selectedGenres.includes(genre)}
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
