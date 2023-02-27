export const movieReducer = (state, action) => {
    switch (action.type) {
        case "SAVE_MOVIES_TO_STORE":
            return { ...state, movies: action.payload }
        case "SET_LAST_PAGE":
            return { ...state, lastPage: action.payload }
        case "SET_NEW_AMOUNT":
            return { ...state, amount: action.payload }
        case "SET_SELECTED_GENRES":
            return { ...state, chosenGenres: action.payload }
        case "SET_LOADING":
            return { ...state, isLoading: action.payload }
        case "SET_ERROR":
            return { ...state, isError: action.payload }
        case "SET_ERROR_MESSAGE":
            return { ...state, errorMessage: action.payload }
        case "RESET_STATE":
            return action.payload
        default:
            return state
    }
}
