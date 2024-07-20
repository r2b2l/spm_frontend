/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,jsx}"],
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 2s linear infinite',
        },
      },
    },
  plugins: [],
}

