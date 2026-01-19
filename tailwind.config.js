/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zone-1': '#94a3b8', // Slate-400
        'zone-2': '#3b82f6', // Blue-500
        'zone-3': '#22c55e', // Green-500
        'zone-4': '#eab308', // Yellow-500
        'zone-5': '#ef4444', // Red-500
        'zone-6': '#a855f7', // Purple-500
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
