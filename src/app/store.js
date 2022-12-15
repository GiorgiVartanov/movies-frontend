import { configureStore } from "@reduxjs/toolkit"

import authReducer from "../features/auth/authSlice"
import favoriteReducer from "../features/favorites/favoritesSlice"
import movieReducer from "../features/movies/movieSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favorite: favoriteReducer,
        movie: movieReducer,
    },
})
