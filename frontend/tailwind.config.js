/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          50: '#FDEDED', 
          100: '#F9C0C0', 
          300: '#EA5455',  
          500: '#C53030',
          700: '#9B1F1F',
        },
        green: {
          50: '#E6F6EA',
          100: '#B7E5B1',
          300: '#28A745',
          500: '#1F7F34',
          700: '#155826',
        },
        yellow: {
          50: '#FFF8E1',
          100: '#FFECB3',
          300: '#FFC107',
          500: '#CC9400',
          700: '#997000',
        },
        blue: {
          50: '#DCE3F8',
          100: '#A3B3E0',
          300: '#121826',
          500: '#0D1016', 
          700: '#080A0D',
        },
        purple: {
          50: '#EDEBFF',
          100: '#CFC6FF',
          300: '#7C71FF',
          500: '#5E4EEB',
          700: '#4237B5',
        },
        gray: {
          25: 'f3f4f6',
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
      // Sistema de Grid similar ao Bootstrap
      width: {
        'col-1': '8.333333%',
        'col-2': '16.666667%',
        'col-3': '25%',
        'col-4': '33.333333%',
        'col-5': '41.666667%',
        'col-6': '50%',
        'col-7': '58.333333%',
        'col-8': '66.666667%',
        'col-9': '75%',
        'col-10': '83.333333%',
        'col-11': '91.666667%',
        'col-12': '100%',
      },
    },
  },
  plugins: [],
};
