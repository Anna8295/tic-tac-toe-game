/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkNavy: '#1A2A33',
        semiDarkNavy: '#1F3641',
        silver: '#A8BFC9',
        silverHover: '#DBE8ED',
        lightBlue: '#31C3BD',
        lightBlueHover: '#65E9E4',
        lightYellow: '#F2B137',
        lightYellowHover: '#FFC860'
      },
      boxShadow:{
        dark: '0px 8px 0px #10212A',
        darkSmall: '0px 4px 0px #10212A',
        grey: '0px 8px 0px #6B8997',
        greySmall: '0px 4px 0px #6B8997',
        blue: '0px 8px 0px #118C87',
        yellow: '0px 8px 0px #CC8B13',
        yellowSmall: '0px 4px 0px #CC8B13'
      },
      screens: {
        xs: "450px",
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.4)', opacity: '0' },
          '70%': { transform: 'scale(1.12)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        riseIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        winBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(2px)' },
        },
      },
      animation: {
        pop: 'pop 0.25s ease-out both',
        riseIn: 'riseIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        fadeIn: 'fadeIn 0.25s ease-out both',
        winBounce: 'winBounce 0.55s ease-in-out 2',
      },
    },
  },
  plugins: [],
}
