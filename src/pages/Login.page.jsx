import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { loginUser, resetState } from "../features/auth/authSlice"

import Input from "../components/Input"
import Spinner from "../components/Spinner"
import Button from "../components/Button"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, errorMessage } = useSelector(
        (state) => state.auth
    )

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

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(resetState())

        reset()
    }, [user, isError, isSuccess, errorMessage, navigate, dispatch, reset])

    const onSubmit = (data) => {
        dispatch(loginUser(data))

        reset()
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="max-w-sm w-full m-auto px-2 mt-52">
            <h1 className="flex mb-4 items-center text-slate-900 gap-1">
                <FaSignInAlt />
                <span className="text-lg font-medium">Login</span>
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 mb-1"
            >
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
            </form>
            <Link
                to="/register"
                className="underline text-slate-400 text-sm ml-1"
            >
                Don't have account yet? register
            </Link>
        </div>
    )
}
export default Login
