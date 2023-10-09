/** @type {import('tailwindcss').Config} */
import withMt from "@material-tailwind/react/utils/withMT";
export default withMt({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
        }, // primary color
        // light
        "light-mist": "#FEFEFF",
        "soft-blue": "#F9FAFF", // light bg
        "gray-blue": "#DEE5EE",
        "slate-blue": "#829BB0",
        "cool-slate": "#74828F",
        // dark
        "deep-charcoal": "#1D1E23", // dark bg
        "midnight-black": "#16171B",
        "deep-navy": "#25262D",
        "pastel-green": "#B7EFB5",
      },
      fontFamily: {
        display: ["Pacifico", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
});
