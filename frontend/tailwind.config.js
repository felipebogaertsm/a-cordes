module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    mode: "jit",
    theme: {
        colors: {
            darkred: "#7D1F1F",
            wood: "#3F241A",
            primary: "#181818",
            secondary: "#E0EDEB",
            leaf: "#AAD8B2",
        },
        extend: {
            fontFamily: {
                sans: ["Raleway", "sans"],
                serif: ["Playfair Display", "serif"],
            },
        },
    },
    plugins: [],
}
