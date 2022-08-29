/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        zinc: {
          50: "#f8f9fa",
          100: "#eef1f2",
          200: "#dde4e6",
          300: "#c1ced2",
          400: "#95a0a3",
          500: "#434849",
          600: "#3a3e40",
          700: "#313537",
          800: "#272a2b",
          900: "#1f2223",
        },
      },
    },
  },
  plugins: [],
};
