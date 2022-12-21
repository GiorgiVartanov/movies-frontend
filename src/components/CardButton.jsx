const CardButton = ({ onClick, className, children }) => {
    return (
        <button
            onClick={onClick}
            className={`hover:text-slate-900 delay-75 duration-200 ease-out ${className}`}
        >
            {children}
        </button>
    )
}
export default CardButton
