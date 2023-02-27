export const blockedMovieReducer = (state, action) => {
    switch (action.type) {
        case "SAVE_BLOCKED_IDS_TO_STORE":
            return { ...state, blockedMovieIds: action.payload }
        case "SAVE_BLOCKED_MOVIES_TO_STORE":
            return { ...state, blockedMovies: action.payload }
        case "BLOCK_MOVIE":
            return {
                ...state,
                blockedMovieIds: [...state.blockedMovieIds, action.payload],
            }
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
