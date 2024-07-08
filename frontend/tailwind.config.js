/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#7684814f",
          100: "#768481",
          200: "#997c6a",
          300: "#919f9c",
          400: "#627a74",
          800: "#364542",
        },
        grey: {
          100: "#fff7f2",
          500: "#C5BDBA",
        },
      },
    },
  },
  plugins: [],
};
