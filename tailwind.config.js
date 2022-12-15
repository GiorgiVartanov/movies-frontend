const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
            ...defaultTheme.fontFamily,
        },
        extend: {
            keyframes: {
                appear: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            animation: {
                appear: "appear 0.1s ease-out",
            },
        },
    },

    plugins: [],
}
