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
                appearFast: "appear 0.1s ease-in",
                appearSlow: "appear 0.2s ease-in",
            },
            backdropBlur: {
                xs: "2px",
                xxs: "1px",
            },
        },
    },

    plugins: [],
}
