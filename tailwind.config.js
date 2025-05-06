/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'translate-y-[100vh]'
  ],
  theme: {
    extend: {
      colors: {
        'border-border': 'var(--border)',
      },
      borderWidth: {
        'border-border': '1px', // Define a custom border width if needed
      },
    },
  },
  plugins: [],
}
