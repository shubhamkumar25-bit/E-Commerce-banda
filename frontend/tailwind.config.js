/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#174D35',
          dark: '#103A29',
          light: '#236547',
        },
        cream: {
          DEFAULT: '#F8F4E9',
          light: '#FCFBF7',
          dark: '#EFE7D3'
        },
        gold: {
          DEFAULT: '#C7A45B',
          light: '#D8BD7D',
          dark: '#B08E44',
          accent: '#E5C778'
        },
        lightgreen: {
          DEFAULT: '#E9F0E7',
          hover: '#DDE7DA'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(16, 58, 41, 0.12)',
        'luxury-gold': '0 10px 30px -10px rgba(199, 164, 91, 0.3)',
      }
    },
  },
  plugins: [],
}

