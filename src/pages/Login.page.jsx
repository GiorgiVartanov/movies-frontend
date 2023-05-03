import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { useAuthStore } from "../store/context/AuthContext"

import Input from "../components/Input"
import Button from "../components/Button"
import Form from "../components/Form"
import Spinner from "../components/Spinner"

const Login = () => {
  const navigate = useNavigate()

  const { loginUser, isLoggedIn, isLoading, isError, errorMessage } =
    useAuthStore()

  const schema = yup.object().shape({
    email: yup.string().email("please enter valid email").required(),
    password: yup.string().required(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    loginUser(data)

    reset()
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }

    reset()
  }, [isLoggedIn, navigate, reset])

  useEffect(() => {
    if (isError) toast(errorMessage)
  }, [isError, errorMessage])

  if (isLoading) return <Spinner />

  return (
    <div className="max-w-sm w-full m-auto px-2 mt-52">
      <h1 className="flex mb-4 items-center text-slate-900 gap-1">
        <FaSignInAlt />
        <span className="text-lg font-medium">Login</span>
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          placeholder="Enter your email"
          errors={errors}
          register={register}
        />
        <Input
          name="password"
          placeholder="Enter your password"
          errors={errors}
          register={register}
          type="password"
        />
        <Button>login</Button>
      </Form>
      <Link
        to="/register"
        className="underline text-slate-400 text-sm ml-1 hover:text-slate-500 transform-all ease-out delay-75 duration-200"
      >
        Don't have account yet? register
      </Link>
    </div>
  )
}
export default Login
