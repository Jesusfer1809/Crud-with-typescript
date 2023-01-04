/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto', sans-serif"]
      },
      screens: {
        sz400: '400px',
        sm: '640px',
        md: '768px',
        sz900: '900px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px'
      }
    }
  },
  plugins: []
}
