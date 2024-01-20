/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      borderImage: {
        "gradient-amber": "linear-gradient(to right, #FFC400, #FF9100) 1",
      },
      borderImageSlice: {
        1: "1",
      },
      colors: {},
      fontFamily: {
        grotesque: "'Darker Grotesque', sans-serif",
        azeret: "'Azeret Mono', monospace",
        roboto_mono: "'Roboto Mono', monospace",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "spin-slow-30": "spin 30s linear infinite",
        "spin-slow-25": "spin 25s linear infinite",
        "spin-slow-10": "spin 10s linear infinite",
        "marquee-infinite": "marquee 25s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
