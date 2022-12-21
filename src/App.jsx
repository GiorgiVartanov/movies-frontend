import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Header from "./components/Header"
import Main from "./pages/Main.page"
import Favorites from "./pages/Favorites.page"
import Register from "./pages/Register.page"
import Login from "./pages/Login.page"
import Movie from "./pages/Movie.page"
import Footer from "./components/Footer"

const App = () => {
    return (
        <div className="font-poppins flex flex-col justify-between h-screen">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/Favorites"
                    element={<Favorites />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/movie/:id"
                    element={<Movie />}
                />
            </Routes>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
            />
        </div>
    )
}

export default App
