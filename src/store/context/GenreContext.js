import { useContext, createContext, useEffect, useReducer } from "react"

import { genreReducer } from "../reducers/genreReducer"
import {
  saveGenresToStore,
  setSelectedGenres,
  setIsLoading,
  setIsError,
  setErrorMessage,
} from "../actions/genreAction"
import { getAllGenres } from "../../utils/services/genres"

export const GenreContext = createContext()

export const useGenreStore = () => useContext(GenreContext)

const initialState = {
  genres: [],
  selectedGenres: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
}

export const GenreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(genreReducer, initialState)

  useEffect(() => {
    const getGenres = async () => {
      try {
        dispatch(setIsLoading(true))

        const data = await getAllGenres()

        dispatch(saveGenresToStore(data.data))
        dispatch(setIsLoading(false))
      } catch (error) {
        dispatch(setIsError(true))
        dispatch(setErrorMessage(error.message))
        dispatch(setIsLoading(false))
      }
    }

    getGenres()
  }, [dispatch])

  const selectGenre = (genre) => {
    if (store.selectedGenres.includes(genre)) return
    dispatch(setSelectedGenres([...state.selectedGenres, genre]))
  }

  const unselectGenre = (genre) => {
    if (!store.selectedGenres.includes(genre)) return
    dispatch(
      setSelectedGenres([
        ...state.selectedGenres.filter(
          (selectedGenres) => selectedGenres !== genre
        ),
      ])
    )
  }

  const store = {
    ...state,
    selectGenre,
    unselectGenre,
  }

  return <GenreContext.Provider value={store}>{children}</GenreContext.Provider>
}

export default GenreProvider
