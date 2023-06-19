/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'carnal-red':'#D72323',
      },
      animation: {
        'bounce-short': 'bounce 1s ease-out 1.5'
      },
      gridAutoColumns: {
        '3fr': 'minmax(0, 3fr)',
      }

    },
  },
  plugins: [],
}