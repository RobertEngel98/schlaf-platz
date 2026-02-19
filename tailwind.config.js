/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sp: {
          blue: "#029fde",
          "blue-light": "#02b5f5",
          "blue-dark": "#0287bd",
          gold: "#ffffff",
          "gold-light": "#f0f0f0",
          "gold-dark": "#e0e0e0",
          bg: "#F7F5F0",
          "bg-alt": "#EDE9E1",
          green: "#2D8A4E",
          "green-light": "#E8F5E9",
        },
      },
      fontFamily: {
        display: ["'DM Sans'", "system-ui", "sans-serif"],
        body: ["'Source Sans 3'", "'Segoe UI'", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { transform: "scale(0)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "slide-down": "slideDown 0.4s ease",
        "scale-in": "scaleIn 0.5s ease",
      },
    },
  },
  plugins: [],
};
