/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      black: "#000",
      white: "#FFF",

      current: "currentColor",
      transparent: "transparent",
      inherit: "inherit",

      customBlue: "#64cdd2",
      customGray: "#E1E1E1",
      customGraylight: "#f2f1f1",
      bcustomBrown: "#DDB38F",
      customRed: "#FF0000",
      customGreen: "#0AA335"
    },
    extend: {},
  },
  plugins: [],
}
