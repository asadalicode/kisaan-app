/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8c43b4',
          contrast: '#ffffff',
        },
        surface: {
          DEFAULT: '#064e3b',
          light: '#047857',
        },
      },
      fontFamily: {
        urdu: ['urdu-heading'],
      },
    },
  },
  plugins: [],
};
