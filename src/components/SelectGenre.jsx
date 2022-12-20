import { useStore } from "../store/StoreContext"

import GenreList from "./GenreList"

const SelectGenre = () => {
    const { genres } = useStore()

    return <GenreList genres={genres} />
}
export default SelectGenre
