import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { useAuthStore } from "../store/context/AuthContext"

import Input from "../components/Input"
import Button from "../components/Button"
import Form from "../components/Form"
import Spinner from "../components/Spinner"

const Register = () => {
  const navigate = useNavigate()

  const { registerUser, isLoggedIn, isLoading, isError, errorMessage } =
    useAuthStore()

  const schema = yup.object().shape({
    name: yup.string().max(30).required(),
    email: yup.string().email("please enter valid email").required(),
    password: yup
      .string()
      .min(8, "password too short")
      .max(30, "password to long")
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords don't match")
      .required(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }

    reset()
  }, [isLoggedIn, navigate, reset])

  useEffect(() => {
    if (isError) toast(errorMessage)
  }, [isError, errorMessage])

  const onSubmit = async (data) => {
    registerUser(data)

    reset()
  }

  if (isLoading) return <Spinner />

  return (
    <div className="max-w-sm w-full m-auto px-2 mt-52">
      <h1 className="flex mb-4 items-center gap-1 text-slate-900">
        <FaUser />
        <span className="text-lg font-medium">Register</span>
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          placeholder="Enter your name"
          errors={errors}
          register={register}
        />
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
        <Input
          name="confirmPassword"
          placeholder="Confirm your password"
          errors={errors}
          register={register}
          type="password"
        />
        <Button>register</Button>
      </Form>
      <Link
        to="/login"
        className="underline text-slate-400 text-sm ml-1 hover:text-slate-500 transform-all ease-out delay-75 duration-200"
      >
        Already have account? Log in
      </Link>
    </div>
  )
}
export default Register
