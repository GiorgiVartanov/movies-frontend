import { useContext, createContext, useEffect, useReducer } from "react"

import { blockedMovieReducer } from "../reducers/blockedMovieReducer"
import {
  saveBlockedMoviesToStore,
  saveBlockedIdsToStore,
  addMovieToBlocked,
  setIsLoading,
  setIsError,
  setErrorMessage,
  resetState,
} from "../actions/blockedMovieAction"
import {
  getBlockedMovies,
  getBlockedIds,
  addBlockedMovie,
  removeBlockedMovie,
} from "../../utils/services/blockedMovies"
import { useAuthStore } from "./AuthContext"

export const BlockedMovieContext = createContext()

export const useBlockedMovieStore = () => useContext(BlockedMovieContext)

const initialState = {
  blockedMovieIds: [],
  blockedMovies: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
}

export const BlockedMovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blockedMovieReducer, initialState)

  const { isLoggedIn, token } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn) return

    const getBlocked = async () => {
      try {
        dispatch(setIsLoading(true))

        const data = await getBlockedMovies(token)

        dispatch(saveBlockedMoviesToStore(data.data))
        dispatch(
          saveBlockedIdsToStore(
            data.data.map((blockedMovie) => blockedMovie._id)
          )
        )
        dispatch(setIsLoading(false))
      } catch (error) {
        dispatch(setIsError(true))
        dispatch(setErrorMessage(error.message))
        dispatch(setIsLoading(false))
      }
    }

    getBlocked()
  }, [isLoggedIn, token])

  const blockMovie = async (movieId) => {
    if (!isLoggedIn) return

    try {
      const blockedMovie = await addBlockedMovie(movieId, token)

      dispatch(
        saveBlockedMoviesToStore([...state.blockedMovies, blockedMovie.data])
      )
    } catch (error) {
      dispatch(setIsError(true))
      dispatch(setErrorMessage(error.message))
    }
  }

  const unblockMovie = async (movieId) => {
    if (!isLoggedIn) return

    try {
      await removeBlockedMovie(movieId, token)
      dispatch(
        saveBlockedMoviesToStore(
          state.blockedMovies.filter(
            (blockedMovie) => blockedMovie._id !== movieId
          )
        )
      )
    } catch (error) {
      dispatch(setIsError(true))
      dispatch(setErrorMessage(error.message))
    }
  }

  const resetBlockedMovieState = () => {
    dispatch(resetState(initialState))
  }

  const store = {
    ...state,
    blockMovie,
    unblockMovie,
    resetBlockedMovieState,
  }

  return (
    <BlockedMovieContext.Provider value={store}>
      {children}
    </BlockedMovieContext.Provider>
  )
}

export default BlockedMovieProvider
