/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        rgb: {
          'red': "rgb(255, 0, 0)",
          'green': 'rgb(0, 255, 0)',
          'blue': 'rgb(0, 0, 255)',
        },
      },
    },
  },
  plugins: [],
}