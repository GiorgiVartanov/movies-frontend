import ajax from "./ajax"

export const getAllFavorites = (token) =>
    ajax.get("/favorites/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

export const addFavorite = (movieId, token) =>
    ajax.post(
        "/favorites",
        { movieId: movieId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

export const removeFavorite = (movieId, token) =>
    ajax.delete(`/favorites/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
