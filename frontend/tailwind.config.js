/** @type {import('tailwindcss').Config} */
import withMt from "@material-tailwind/react/utils/withMT";
export default withMt({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#282C32",
        primary: {
          50: "#f4f2ff",
          100: "#eae8ff",
          200: "#d8d4ff",
          300: "#bcb1ff",
          400: "#9b85ff",
          500: "#774eff",
          600: "#6a30f7",
          700: "#5d1ee3",
          800: "#4d18bf",
          900: "#40169c",
          950: "#260b6a",
        },
        // bg
        "p-light": "#FFFFFF",
        "s-light": "#F7F8FB",
        "p-dark": "#1C1C26",
        "s-dark": "#262831",
        // text
        "b-dark": "#52576F",
        "t-dark": "#B1B1C7",
        "gray-500": "#697078",
      },
      fontFamily: {
        display: ["Pacifico", "cursive"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
});
