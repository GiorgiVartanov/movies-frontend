import ajax from "./ajax"

export const getAllMovies = (offset, amount, genres) =>
    ajax.get(`/movies/all?offset=${offset}&amount=${amount}&genres=${genres}`)

export const getAllFavorites = (token) =>
    ajax.get("/favorites/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

export const addFavoriteMovie = (movieId, token) =>
    ajax.post(
        "/favorites",
        { movieId: movieId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

export const removeFavoriteMovie = (movieId, token) =>
    ajax.delete(`/favorites/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

export const getBlockedIds = (token) =>
    ajax.get("/block/ids", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

export const blockMovie = (movieId, token) =>
    ajax.post(
        "/block",
        { movieId: movieId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

export const unblockMovie = (movieId, token) =>
    ajax.delete(`/block/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
