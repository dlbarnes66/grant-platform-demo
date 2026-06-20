/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#1E3A8A",   // deep navy blue
        brandGold: "#FBBF24",   // warm gold
        brandLight: "#EFF6FF",  // soft blue background
      },
    },
  },
  plugins: [],
};
