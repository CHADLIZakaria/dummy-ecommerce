/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'second-color': "#096B68",
        'main-color': '#309898'
      }
    },
    fontFamily: {
      body: [
        'Comic Relief'
      ],
      header: '"Mouse Memoirs"'
    }
  },
  plugins: [],
}

