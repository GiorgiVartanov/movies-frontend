import { useContext, createContext, useEffect, useReducer } from "react"

import { commentReducer } from "../reducers/commentReducer"
import { useAuthStore } from "./AuthContext"

export const CommentContext = createContext()

export const useCommentStore = () => useContext(CommentContext)

const initialState = {
  comments: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
}

export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState)

  const { isLoggedIn, token } = useAuthStore()

  const getCommentsForMovie = (movieId) => {
    try {
    } catch (error) {}
  }
}
