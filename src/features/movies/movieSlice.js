import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import movieService from "./movieService"

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Get movies
export const getMovies = createAsyncThunk(
    "movie/getAll",
    async (searchData, thunkAPI) => {
        try {
            return await movieService.getMovies(searchData)
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

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

                toast.error(action.payload)
            })
    },
})

export const { resetState } = movieSlice.actions
export default movieSlice.reducer
