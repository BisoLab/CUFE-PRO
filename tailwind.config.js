/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neu-yellow': '#FFDE59',
        'neu-orange': '#FF914D',
        'neu-blue': '#5CE1E6',
        'neu-black': '#1E1E1E',
      },
      boxShadow: {
        'neu': '5px 5px 0px 0px #1E1E1E',
      }
    },
  },
  plugins: [],
}
