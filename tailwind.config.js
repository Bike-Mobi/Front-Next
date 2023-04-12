/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:s
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'azul': '#3AA0FF',
      'white': '#fff',
      'tomEscuro': '#170F49',
      'cinza': '#5E597A',
      'cinzaClaro': '#EFF0F6'
    },
    fontFamily: {
      'dmsans': ['DM Sans', 'sans-serif'],
      'robot': ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

