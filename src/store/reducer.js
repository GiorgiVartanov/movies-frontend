export const reducer = (state, action) => {
    switch (action.type) {
        case "SAVE_MOVIES_TO_STORE":
            return { ...state, movies: action.payload }
        case "SAVE_FAVORITES_TO_STORE":
            return { ...state, favorites: action.payload }
        case "SAVE_BLOCKED_TO_STORE":
            return { ...state, blocked: action.payload }
        case "ADD_FAVORITE_TO_STORE":
            return { ...state, favorites: [...state.favorites, action.payload] }
        case "SAVE_GENRES_TO_STORE":
            return { ...state, genres: action.payload }
        case "SET_NEW_PAGE":
            return { ...state, page: action.payload }
        case "SET_NEW_AMOUNT":
            return { ...state, amount: action.payload }
        case "SET_SELECTED_GENRES":
            return { ...state, chosenGenres: action.payload }
        case "SET_USER":
            return { ...state, user: action.payload }
        default:
            return state
    }
}
