import ajax from "./ajax"

export const getAllGenres = async () => ajax.get("/genres/all") // returns all genres
