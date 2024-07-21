module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        secondary: "#FF4D4D",
        "dark-gray": "#1A1A1A",
      },
      fontFamily: {
        inter: ["Inter Tight", "sans-serif"],
        mabry: ["Mabry Pro", "sans-serif"],
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "4.2xl": "2.8rem",
        "4.5xl": "3.3rem",
        "5xl": "3.8rem",
        "6xl": "4rem",
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
        "3xl": "3rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
