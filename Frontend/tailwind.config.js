/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  darkMode: 'class', // enables class-based dark mode (tailwind expects "class")

  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',       // main dark background
          surface: '#1e293b',  // elements/cards
          card: '#334155',     // elevated containers
        },
        light: {
          bg: '#ffffff',       // main light background
          surface: '#f8fafc',  // secondary surfaces
          card: '#f1f5f9',     // card backgrounds
        },
      },
    },
  },

  plugins: [],
}
