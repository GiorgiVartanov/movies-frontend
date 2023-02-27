export const genreReducer = (state, action) => {
    switch (action.type) {
        case "SAVE_GENRES_TO_STORE":
            return { ...state, genres: action.payload }
        case "SET_SELECTED_GENRES":
            return { ...state, selectedGenres: action.payload }
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
