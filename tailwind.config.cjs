/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
      backgroundColor:{
      'formColor':'#282828'
      },

      backgroundImage: {
        'signup': "url(/signup.jpeg)"
      }
    },
  },
  plugins: [require("daisyui")],
}
