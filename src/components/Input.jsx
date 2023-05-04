const Input = ({
  name,
  register,
  errors,
  placeholder,
  type,
  className,
  ...rest
}) => {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`border-2 px-4 py-1 w-full placeholder-slate-700/50 text-slate-800 rounded-md ${
          errors && errors[name] ? "border-red-500" : "border-slate-200"
        } ${className}`}
        {...register(name)}
        {...rest}
      />
      {errors && errors[name] ? (
        <span className=" text-red-500 text-sm">{errors[name]?.message}</span>
      ) : (
        ""
      )}
    </div>
  )
}

export default Input
