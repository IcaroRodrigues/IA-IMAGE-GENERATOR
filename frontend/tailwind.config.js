/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#EA5455',
        blue: '#121826',
        purple: '#7C71FF',
        gray: {
          50: '#E4E4E7',
          100: '#394150',
          200: '#394150',
          300: '#6C727F',
          600: '#212936',
        },
        fontColor: '#FFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
