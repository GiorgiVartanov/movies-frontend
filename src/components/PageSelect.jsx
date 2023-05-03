import ShowPerPage from "./ShowPerPage"

const PageSelect = ({
  nextPage,
  prevPage,
  goToFirstPage,
  page,
  maximumAmountOfMovies,
  amount,
  pagesAmount,
}) => {
  const handleGoToPrevPage = () => {
    if (page === 0) return
    prevPage()
    window.scrollTo(0, 0)
  }
  const handleGoToNextPage = () => {
    nextPage()
    window.scrollTo(0, 0)
  }

  const renderPrevButton = ({ disabled = false } = {}) => {
    return (
      <button
        onClick={handleGoToPrevPage}
        disabled={disabled}
        className="bg-slate-900 text-slate-100 px-3 py-1 hover:bg-slate-800 ease-out delay-75 duration-200 disabled:hover:bg-slate-600 disabled:bg-slate-600"
      >
        prev
      </button>
    )
  }

  const renderNextButton = ({ disabled = false } = {}) => {
    return (
      <button
        onClick={handleGoToNextPage}
        disabled={disabled}
        className="bg-slate-900 text-slate-100 px-3 py-1 hover:bg-slate-800 ease-out delay-75 duration-200 disabled:hover:bg-slate-600 disabled:bg-slate-600"
      >
        next
      </button>
    )
  }

  return (
    <div className="m-auto w-full justify-center flex flex-row gap-2 my-3 relative">
      {page === 0
        ? renderPrevButton({ disabled: true })
        : renderPrevButton({ disabled: false })}

      <div className="h-full text-lg text-slate-700 font-bold">{page + 1}</div>

      {maximumAmountOfMovies > amount * (page + 1)
        ? renderNextButton({ disabled: false })
        : renderPrevButton({ disabled: true })}

      <ShowPerPage
        options={[10, 20, 30, 40]}
        onSelect={goToFirstPage}
        className="absolute right-2 h-full"
      />
    </div>
  )
}
export default PageSelect
