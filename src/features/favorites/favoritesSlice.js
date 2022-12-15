import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import favoriteService from "./favoriteService"

const initialState = {
    favorites: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Add movie to favorites
export const addFavorite = createAsyncThunk(
    "favorite/create",
    async (movieId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await favoriteService.addFavorite(
                { movieId: movieId },
                token
            )
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get favorites
export const getFavorites = createAsyncThunk(
    "favorites/all",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user?.token
            return await favoriteService.getFavorites(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Remove from favorites
export const removeFavorite = createAsyncThunk(
    "favorite/remove",
    async (movieId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user?.token
            return await favoriteService.removeFavorite(movieId, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.favorites.push(action.payload)

                toast.success("successfully added movie to favorites")
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

                toast.error(action.payload)
            })
            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.favorites = action.payload
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeFavorite.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.favorites = state.favorites.filter(
                    (favorite) => favorite._id !== action.payload.id
                )

                toast.success("successfully removed movie from favorites")
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

                toast.error("something wen't wrong")
            })
    },
})

export const { resetState } = favoriteSlice.actions
export default favoriteSlice.reducer
