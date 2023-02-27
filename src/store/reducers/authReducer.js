export const authReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        case "SET_TOKEN":
            return { ...state, token: action.payload }
        case "SET_IS_LOGGED_IN":
            return { ...state, isLoggedIn: action.payload }
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
