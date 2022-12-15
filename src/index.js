import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react"
import { Provider } from "react-redux"

// import { apiSlice } from "./features/api/apiSlice"
import { store } from "./app/store"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)

reportWebVitals()
