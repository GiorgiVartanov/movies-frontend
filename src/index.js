import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"

import AuthProvider from "./store/context/AuthContext"
import GenreProvider from "./store/context/GenreContext"
import BlockedMovieProvider from "./store/context/BlockedMovieContext"
import FavoriteMovieProvider from "./store/context/FavoriteMovieContext"
import MovieProvider from "./store/context/MovieContext"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <GenreProvider>
        <BlockedMovieProvider>
          <FavoriteMovieProvider>
            <MovieProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MovieProvider>
          </FavoriteMovieProvider>
        </BlockedMovieProvider>
      </GenreProvider>
    </AuthProvider>
  </React.StrictMode>
)

reportWebVitals()
