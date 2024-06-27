/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {

      fontFamily: {
        Archivo: ['Archivo Black', "sans-serif"]
      },


      keyframes: {
        slideIn: {
          "0%": {  transform: "translateX(100%)" },
          "100%": {transform:  "translateX(0%)" },
          // "0%": { opacity: "0" },
          // "100%": { opacity: "1", visibility: "visible" },
        },
        slideOut: {
          // "0%": { opacity: "1" },
          // "100%": { opacity: "0", visibility: "invisible" },
          "0%": {  transform: "translateX(0%)" },
          "100%": {transform:  "translateX(100%)" },
        },
        spun: {
          // "0%": { opacity: "1" },
          // "100%": { opacity: "0", visibility: "invisible" },
          "0%": {  transform: "rotate(0deg)" },
          "100%": {transform:  "rotate(360deg)" },
        },
     giglan: {
          "0%": {
 transform: "translateY(0)"
          },
          "20%": {
 transform: "translateY(0)"
          },
          "50%": {
 transform: "translateY(0)"
          },
          "80%": {
 transform: "translateY(0)"
          },
          "40%":{
            transform: "translateY(-20px)"
          },
          "60%": {
            transform: "translateY(-10px)"
          }
        },
      },
    },
    animation: {
      slideIn: "slideIn 400ms ease-in-out forwards",
      slideOut: "slideOut 400ms ease-in-out forwards",
      spinner: "spun 10000ms linear infinite",
      giglan: "giglan 1000ms linear infinite"
      // fadeIn: "fadeIn 400ms ease-in-out forwards",
      // fadeOut: "fadeOut 400ms ease-in-out forwards",
    },
  },
  plugins: [],
}
