/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#849b87',
      },
      fontFamily: {
        heading: ['Cabin Sketch', 'cursive', 'Helvetica', 'sans-serif'],
        body: ['Raleway', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

