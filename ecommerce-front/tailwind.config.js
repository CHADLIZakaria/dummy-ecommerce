/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-color': "#264653",
        'second-color': '#F4A261'
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

