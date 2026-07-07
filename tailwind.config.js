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
    },
  },
  plugins: [],
}
