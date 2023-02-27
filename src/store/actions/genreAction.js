import {
    SAVE_GENRES_TO_STORE,
    SET_SELECTED_GENRES,
    SET_LOADING,
    SET_ERROR,
    SET_ERROR_MESSAGE,
} from "../actionTypes"

export const saveGenresToStore = (genres) => ({
    payload: genres,
    type: SAVE_GENRES_TO_STORE,
})

export const setSelectedGenres = (genres) => ({
    payload: genres,
    type: SET_SELECTED_GENRES,
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
