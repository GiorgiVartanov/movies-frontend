import { useStore } from "../store/StoreContext"

import ShowPerPage from "./ShowPerPage"

const PageSelect = () => {
    const { page, setPage } = useStore()

    const handleGoToPrevPage = () => {
        if (page === 0) return
        setPage(page - 1)
        window.scrollTo(0, 0)
    }
    const handleGoToNextPage = () => {
        setPage(page + 1)
        window.scrollTo(0, 0)
    }

    return (
        <div className="m-auto justify-center flex flex-row gap-2 my-3 relative">
            <button
                onClick={handleGoToPrevPage}
                className="bg-slate-900 text-slate-100 px-3 py-1 hover:bg-slate-800 ease-out delay-75 duration-200"
            >
                prev
            </button>
            <div className="h-full text-lg text-slate-700 font-bold">
                {page + 1}
            </div>
            <button
                onClick={handleGoToNextPage}
                className="bg-slate-900 text-slate-100 px-3 py-1 hover:bg-slate-800 ease-out delay-75 duration-200"
            >
                next
            </button>
            <ShowPerPage
                options={[10, 20, 30, 40]}
                className="absolute right-2 h-full"
            />
        </div>
    )
}
export default PageSelect
