export const favoriteMovieReducer = (state, action) => {
    switch (action.type) {
        case "SAVE_FAVORITES_TO_STORE":
            return { ...state, favoriteMovies: action.payload }
        case "SET_LOADING":
            return { ...state, isLoading: action.payload }
        case "SET_ERROR":
            return { ...state, isError: action.payload }
        case "SET_ERROR_MESSAGE":
            return { ...state, errorMessage: action.payload }
        default:
            return state
    }
}
