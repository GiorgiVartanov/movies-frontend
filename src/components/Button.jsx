const Button = ({ onClick, className, children }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full font-medium m-auto px-5 py-2 transform-all ease-out delay-75 duration-200 text-slate-100 bg-slate-900 hover:shadow-slate-900/25 shadow-md shadow-slate-900/15 rounded-md ${className}`}
        >
            {children}
        </button>
    )
}
export default Button
