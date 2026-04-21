/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
      colors: {
        'game-orange': '#FF9F1C',
        'game-green': '#2EC4B6',
        'game-blue': '#3A86FF',
        'game-pink': '#FF006E',
        'game-purple': '#8338EC',
      },
      boxShadow: {
        'game': '0 8px 0 rgba(0, 0, 0, 0.15)',
        'game-sm': '0 4px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}