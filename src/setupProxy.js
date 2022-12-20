const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://movie-backend-7vfd.onrender.com/api",
            changeOrigin: true,
        })
    )
}
