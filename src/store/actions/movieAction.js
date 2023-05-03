import {
  SAVE_MOVIES_TO_STORE,
  SET_LAST_PAGE,
  SET_NEW_AMOUNT,
  SET_MAXIMUM_AMOUNT_OF_MOVIES,
  SET_LOADING,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  RESET_STATE,
} from "../actionTypes"

export const saveMoviesToStore = (movies) => ({
  payload: movies,
  type: SAVE_MOVIES_TO_STORE,
})

export const setPage = (page) => ({
  payload: page,
  type: SET_LAST_PAGE,
})

export const setNewAmount = (amount) => ({
  payload: amount,
  type: SET_NEW_AMOUNT,
})

export const setMaximumAmountOfMovies = (maximumAmountOfMovies) => ({
  payload: maximumAmountOfMovies,
  type: SET_MAXIMUM_AMOUNT_OF_MOVIES,
})

export const setIsLoading = (isLoading) => ({
  payload: isLoading,
  type: SET_LOADING,
})

export const setIsError = (isError) => ({
  payload: isError,
  type: SET_ERROR,
})

export const setErrorMessage = (errorMessage) => ({
  payload: errorMessage,
  type: SET_ERROR_MESSAGE,
})

export const resetState = (defaultState) => ({
  payload: defaultState,
  type: RESET_STATE,
})
