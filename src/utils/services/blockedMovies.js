import ajax from "./ajax"

export const getBlockedMovies = (token) =>
  // returns array of current (token's owner) user's blocked movies
  ajax.get("/block/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const getBlockedIds = (token) =>
  // returns array of current (token's owner) user's blocked movie's ids
  ajax.get("/block/ids", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const addBlockedMovie = (movieId, token) =>
  // blocks passed movie for the current user
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
  // unblocks passed movie for the current user
  ajax.delete(`/block/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
