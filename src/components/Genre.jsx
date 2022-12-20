const Genre = ({ genre, isSelected, onClick }) => {
    return (
        <button
            className={`text-slate-100 bg-slate-800 px-3 py-1 hover:bg-slate-900 delay-75 duration-200 ease-out ${
                isSelected ? "bg-sky-900 hover:bg-sky-800" : ""
            }`}
            onClick={onClick}
        >
            {genre}
        </button>
    )
}
export default Genre
