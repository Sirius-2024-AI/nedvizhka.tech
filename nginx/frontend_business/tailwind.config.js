/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      screens: {
          'xl': '1440px',
          'md': '1024px'
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
      extend: {
        backgroundImage: {
          'hero-pattern': "url('images/image.png')",
        },
        buttonImage: {
          'btn-img': "url(images/Mediamodifier-Design (1).svg)"
        },
          colors: {
              'almost-white': 'hsl(0, 0%, 98%)',
              'medium-gray': 'hsl(0, 0%, 41%)',
              'almost-black': 'hsl(0, 0%, 8%)'
          }
      },
      fontFamily: {
        inter: ["Inter Tight", "sans-serif"],
        mabry: ["Mabry Pro", "sans-serif"],
  },

  plugins: [],}}