/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          "0%": {
            transform: "translateX(100px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        fadeOut: "fadeOut 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
