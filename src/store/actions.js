import {
    SAVE_MOVIES_TO_STORE,
    SAVE_FAVORITES_TO_STORE,
    ADD_FAVORITE_TO_STORE,
    SAVE_GENRES_TO_STORE,
    SAVE_BLOCKED_TO_STORE,
    ADD_BLOCKED_TO_STORE,
    // REMOVE_BLOCKED_FROM_STORE,
    SET_NEW_PAGE,
    SET_NEW_AMOUNT,
    SET_SELECTED_GENRES,
    SET_USER,
} from "./actionTypes"

export const saveMoviesToStore = (movies) => ({
    payload: movies,
    type: SAVE_MOVIES_TO_STORE,
})

export const saveFavoritesToStore = (favorites) => ({
    payload: favorites,
    type: SAVE_FAVORITES_TO_STORE,
})

export const addFavoriteToStore = (favorite) => ({
    payload: favorite,
    type: ADD_FAVORITE_TO_STORE,
})

export const saveGenresToStore = (genres) => ({
    payload: genres,
    type: SAVE_GENRES_TO_STORE,
})

export const saveBlockedToStore = (blocked) => ({
    payload: blocked,
    type: SAVE_BLOCKED_TO_STORE,
})

export const addBlockedToStore = (blocked) => ({
    payload: blocked,
    type: ADD_BLOCKED_TO_STORE,
})

export const setNewPage = (page) => ({
    payload: page,
    type: SET_NEW_PAGE,
})

export const setNewAmount = (amount) => ({
    payload: amount,
    type: SET_NEW_AMOUNT,
})

export const setSelectedGenres = (chosenGenres) => ({
    payload: chosenGenres,
    type: SET_SELECTED_GENRES,
})

export const setUser = (user) => ({
    payload: user,
    type: SET_USER,
})
