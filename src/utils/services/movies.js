import ajax from "./ajax"

export const getAllMovies = (offset, amount, genres) =>
  // returns array of movies
  ajax.get(`/movies/all?offset=${offset}&amount=${amount}&genres=${genres}`)

export const getFilteredMovies = (offset, amount, genres, token) =>
  // returns array of movies, but filters current user's blocked ones
  ajax.get(
    `/movies/filtered?offset=${offset}&amount=${amount}&genres=${genres}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
