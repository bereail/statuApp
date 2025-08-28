/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',               // evita 'media' (que sigue el SO)
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],             // solo tema claro
    logs: false,
  },
}
