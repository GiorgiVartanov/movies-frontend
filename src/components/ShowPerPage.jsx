import { useStore } from "../store/StoreContext"

const ShowPerPage = ({ options, className }) => {
    const { amount, setAmount } = useStore()

    const handleSelect = (e) => {
        setAmount(e.target.value)
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
