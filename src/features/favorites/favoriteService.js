import axios from "axios"

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/favorites/`

// Get favorite movies
const getFavorites = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + "all", config)

    return response.data
}

// Add new favorite movie
const addFavorite = async (favoriteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, favoriteData, config)

    return response.data
}

// Remove movie from favorites
const removeFavorite = async (movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + movieId, config)

    return response.data
}

const todoService = {
    getFavorites,
    addFavorite,
    removeFavorite,
}

export default todoService
