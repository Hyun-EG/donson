/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        sm500: "500px",
      },
      backgroundImage: {
        "ren-pattern": "url('/bg/donson-login-bg.webp')",
        "ren-video": "url('/video/video-splash.webp')",
        "ad-summer": "url('/images/ad-summer.webp')",
      },
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
