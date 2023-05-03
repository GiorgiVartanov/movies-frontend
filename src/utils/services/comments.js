import ajax from "./ajax"

export const getCommentsForMovie = (movieId) =>
  ajax.get(`/comments/${movieId}`, {})

export const addComment = (movieId, token) =>
  ajax.post(
    "/comments",
    { movieId: movieId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
