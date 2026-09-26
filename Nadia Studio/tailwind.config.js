/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#F5F5F7',
          dark: '#1D1D1F',
          black: '#000000',
          card: '#FFFFFF',
          muted: '#86868B',
          border: '#E5E5EA',
          borderDark: '#333336',
          blue: '#0071E3',
          blueHover: '#0077ED'
        },
        studio: {
          gold: '#9A7B4F',
          goldLight: '#F7F3EE',
          rose: '#B86A73',
          roseLight: '#FAF0F2'
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif'
        ]
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.02em',
        tight: '-0.01em',
      }
    },
  },
  plugins: [],
}
