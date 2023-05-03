const Form = ({ onSubmit, className, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-2 mb-1 ${className}`}
    >
      {children}
    </form>
  )
}
export default Form
