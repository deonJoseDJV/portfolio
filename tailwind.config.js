/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        bgDark: "#070716",
        heroDark: "#150B27", 
         bgLight: "#DCD5EB",
        
        primary: "#8b5cf6",
        secondary: "#ec4899",
      },
    },
  },

  plugins: [],
};