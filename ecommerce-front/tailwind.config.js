/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#309898',
        'second-color': "#096B68",
        'bg-color': '#f4f4f4'
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

