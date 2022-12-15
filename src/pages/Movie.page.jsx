import { useParams } from "react-router-dom"

const Movie = () => {
    const { id } = useParams()

    return <div>{id}</div>
}
export default Movie
