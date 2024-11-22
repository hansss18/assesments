/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FFCA00",
        "error": "#D03B3C",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

