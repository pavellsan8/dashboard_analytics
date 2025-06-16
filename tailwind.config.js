/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.{html,js,ejs}",
    "./backend/views/**/*.{html,js,ejs}",
    "./frontend/src/**/*.{html,js}",
    "./**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}