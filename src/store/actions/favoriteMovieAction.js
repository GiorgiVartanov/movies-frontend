import {
    SAVE_FAVORITES_TO_STORE,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    SET_LOADING,
    SET_ERROR,
    SET_ERROR_MESSAGE,
} from "../actionTypes"

export const saveFavoritesToStore = (movies) => ({
    payload: movies,
    type: SAVE_FAVORITES_TO_STORE,
})

export const addFavoriteToStore = (movieToAdd) => ({
    payload: movieToAdd,
    type: ADD_FAVORITE,
})

export const removeFavorite = (movieToRemove) => ({
    payload: movieToRemove,
    type: REMOVE_FAVORITE,
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
