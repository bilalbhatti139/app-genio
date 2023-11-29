/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom1: '0px 6px 8px 0px rgba(0, 0, 0, 0.22) inset'
      },
    
    },
  },
  plugins: [],
}
