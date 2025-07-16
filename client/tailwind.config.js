/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'page-gradient': 'linear-gradient(0deg, rgba(255, 1, 170, 0.2) 0%, rgba(9, 0, 49, 0.2) 25%), #0F0F0F',
      },
      fontFamily: {
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};