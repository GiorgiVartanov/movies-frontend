export const favoriteMovieReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return { ...state, comments: action.payload }
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
