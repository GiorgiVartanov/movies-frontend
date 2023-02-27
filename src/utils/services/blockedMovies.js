import ajax from "./ajax"

export const getBlockedMovies = (token) =>
    ajax.get("/block/movies", {
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

export const addBlockedMovie = (movieId, token) =>
    ajax.post(
        "/block",
        { movieId: movieId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

export const removeBlockedMovie = (movieId, token) =>
    ajax.delete(`/block/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
