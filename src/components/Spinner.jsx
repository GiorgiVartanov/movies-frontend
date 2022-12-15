const Spinner = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-l-slate-800 rounded-full"></div>
        </div>
    )
}
export default Spinner
