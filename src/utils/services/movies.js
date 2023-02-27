import ajax from "./ajax"

export const getAllMovies = (offset, amount, genres) =>
    ajax.get(`/movies/all?offset=${offset}&amount=${amount}&genres=${genres}`)

export const getFilteredMovies = (offset, amount, genres, token) =>
    ajax.get(
        `/movies/filtered?offset=${offset}&amount=${amount}&genres=${genres}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
