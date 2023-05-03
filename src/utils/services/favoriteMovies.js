import ajax from "./ajax"

export const getAllFavorites = (token) =>
  // returns array of user's favorite movies
  ajax.get("/favorites/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const addFavorite = (movieId, token) =>
  // adds passed movie to current user's favorite movie list
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
  // removes movie from current user's favorite movie list
  ajax.delete(`/favorites/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
