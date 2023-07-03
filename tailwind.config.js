/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          default: "#131516",
          50: "rgb(24, 26, 27)",
          100: "rgb(30, 32, 33)",
          200: "#272A2C",
          300: "rgb(48, 52, 54)",
          400: "rgb(76, 82, 85)",
          500: "rgb(158, 149, 137)",
          600: "rgb(180, 174, 164)",
          700: "rbg(192, 186, 177)",
          800: "rgb(208, 204, 198)",
          900: "rgb(217, 214, 209)",
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(mt|mb|mr|ml|my|mx|px|py|pt|pb|pl|pr)-[0-9]+/,
    },
    {
      pattern: /flex-.*/,
    },
    {
      pattern: /(bottom|right|top|left)-[0-9]+/,
    },
    {
      pattern: /(w|h)-[0-9]+/,
    },
  ],
};
