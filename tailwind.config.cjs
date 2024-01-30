/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F3A3D6",
        secondary: "#EECCC7",
        tertiary: "#F8A2E8",
        redPrimary: "#D65243",
        background: "#FFFFFF",
        hover: "#646464",
        gray: "#911439",
        hover: "Black",
        cont: "#be7c94",
      },
    },
    screens: {
      "2xs": "100px",
      "xs": "380px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": '1280px',
      "2xl": '1536px',
    },
  },

  plugins: [],
};
