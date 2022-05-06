module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      esm: "450px",
      sm: "576px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 1024px) { ... }

      xl: "1200px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      container: {
        center: true,
        screens: {
          sm: "540px",
          md: "720px",
          lg: "1124px",
          xl: "1124px",
          "2xl": "1124px",
        },
      },
      backgroundColor: {
        primary: "#0050aa",
        lg_blue: "#f5f8fc",
      },

      textColor: {
        primary: "#0050aa",
      },

      width: {
        calc: "calc(100% - 300px)",
      },

      borderColor: {
        primary: "#0050aa",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
