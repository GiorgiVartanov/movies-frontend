import axios from "axios"

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/movie/`

// Get movies
const getMovies = async (searchData) => {
    const response = await axios.get(
        `${API_URL}all?offset=${searchData.offset}&amount=${searchData.amount}`
    )

    return response.data
}

const movieService = {
    getMovies,
}

export default movieService
