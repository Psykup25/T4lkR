/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00FFCC',
        'neon-purple': '#5F5FFF', 
        'neon-pink': '#FF01AA'
      },
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace']
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(0deg, rgba(255, 1, 170, 0.2) 0%, rgba(9, 0, 49, 0.2) 24.97%), #0F0F0F'
      },
      boxShadow: {
        'neon-cyan': '0 0 20px 4px rgba(0, 255, 204, 0.4)',
        'neon-pink': '0 0 20px 4px rgba(255, 1, 170, 0.4)',
        'page-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
}