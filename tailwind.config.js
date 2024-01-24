/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  colors: {
    white:"#fff",
    black:"#000",
    transparent:"#ffffff00",
    richblack:{
      5:"#F1F2FF"
    }
  },
    extend: {
      
    },
  },
  plugins: [],
}

