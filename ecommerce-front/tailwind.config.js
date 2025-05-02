/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-color': "#43aa8b",
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

