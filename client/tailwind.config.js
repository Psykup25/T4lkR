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
      colors: {
        'neon-cyan': '#00FFCC',
        'neon-pink': '#FF01AA',
        'neon-purple': '#5F5FFF',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px 4px rgba(0, 255, 204, 0.4)',
        'neon-purple': '0 0 16px 2px rgba(95, 95, 255, 0.47)',
        'page-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};