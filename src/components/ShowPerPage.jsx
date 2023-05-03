import { useMovieStore } from "../store/context/MovieContext"

const ShowPerPage = ({ options, onSelect, className }) => {
  const { amount, setAmount } = useMovieStore()

  const handleSelect = (e) => {
    setAmount(e.target.value)
    onSelect()
  }

  return (
    <select
      name="amount of movies per page"
      id=""
      onChange={handleSelect}
      defaultValue={amount}
      className={`text-slate-800 font-semibold h-full px-1 ${className}`}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
}

export default ShowPerPage
