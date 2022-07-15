module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    mode: "jit",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Raleway", "sans"],
                serif: ["Playfair Display", "serif"],
            },
            colors: {
                darkred: "#7D1F1F",
                wood: "#781900",
                dark: "#181818",
                light: "#E0EDEB",
                leaf: "#AAD8B2",
            },
        },
    },
    plugins: [],
}
