/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zone-1': '#C7C7CC', // Zone 1 from Figma
        'zone-2': '#00C0E8', // Zone 2 from Figma
        'zone-3': '#34C759', // Zone 3 from Figma
        'zone-4': '#FFCC00', // Zone 4 from Figma
        'zone-5': '#FF8D28', // Zone 5 from Figma
        'zone-6': '#FF5F57', // Zone 6 from Figma
        'zone-7': '#B8191C', // Zone 7 from Figma
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
