import {
    SAVE_BLOCKED_MOVIES_TO_STORE,
    SAVE_BLOCKED_IDS_TO_STORE,
    BLOCK_MOVIE,
    SET_LOADING,
    SET_ERROR,
    SET_ERROR_MESSAGE,
    RESET_STATE,
} from "../actionTypes"

export const saveBlockedMoviesToStore = (blockedMovies) => ({
    payload: blockedMovies,
    type: SAVE_BLOCKED_MOVIES_TO_STORE,
})

export const saveBlockedIdsToStore = (blockedMovieIds) => ({
    payload: blockedMovieIds,
    type: SAVE_BLOCKED_IDS_TO_STORE,
})

export const addMovieToBlocked = (movieToBlock) => ({
    payload: movieToBlock,
    type: BLOCK_MOVIE,
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
