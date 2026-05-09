/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glam: {
          black: '#070708',
          surface: '#101012',
          gold: '#e8c872',
          goldmuted: '#c9a227',
        },
      },
      boxShadow: {
        card: '0 18px 40px rgba(0, 0, 0, 0.55)',
      },
    },
  },
  plugins: [],
}
