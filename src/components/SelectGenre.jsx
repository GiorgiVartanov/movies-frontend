import { useGenreStore } from "../store/context/GenreContext"

import GenreList from "./GenreList"

const SelectGenre = () => {
  const { genres, isLoading } = useGenreStore()

  if (isLoading) return

  return (
    <GenreList
      genres={genres}
      className="mt-12 mb-8 px-2 justify-center max-w-lg mx-auto"
    />
  )
}
export default SelectGenre
