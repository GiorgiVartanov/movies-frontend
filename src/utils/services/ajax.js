import axios from "axios"

const ajax = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

ajax.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default ajax
