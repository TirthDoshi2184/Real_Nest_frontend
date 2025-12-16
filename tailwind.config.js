/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to your React components
    "./public/index.html",
  ],
  theme: {
    extend: {
      // Add custom theme extensions here
      colors: {
        // Example custom colors
        'custom-blue': '#1234567',
      },
    },
  },
  plugins: [],
}