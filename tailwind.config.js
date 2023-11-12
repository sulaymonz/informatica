/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#030c0b',
      white: '#f3fcfb',
      primary: '#25628d',
      secondary: '#f2cfd2',
      accent: '#c16f33',
    },
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif'],
      serif: ['"PT Serif"', 'serif'],
    },
  },
  plugins: [],
};
