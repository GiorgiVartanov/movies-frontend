import { useStore } from "../store/StoreContext"

import MovieList from "../components/MovieList"
import PageSelect from "../components/PageSelect"
import SelectGenre from "../components/SelectGenre"

const Main = () => {
    const { movies } = useStore()

    return (
        <div>
            <SelectGenre />
            <MovieList movies={movies} />
            <PageSelect />
        </div>
    )
}
export default Main
