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
      'cinza': '#979797',
      'cinzaClaro': '#EFF0F6'
    },
    fontFamily: {
      'dmsans': ['DM Sans', 'sans-serif'],
      'robot': ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3AA0FF",
          "secondary": "#170F49",
          "accent": "#979797",
          "neutral": "#1E1E1E",
          "base-100": "#fff",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

