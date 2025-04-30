/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-color': "#BDE0FE",
        'border-color': '#43aa8b'
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

