/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx}',
    './App.tsx',
    './main.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './contexts/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'imperial-black': '#0A0A0B',
        'deep-onyx': '#0F0F0F',
        'obsidian-charcoal': '#1A1A1A',
        'platinum': '#A8A9AD',
        'platinum-silver': '#E5E4E2',
        'ivory-bone': '#F2EEE7',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}