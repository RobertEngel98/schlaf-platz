/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sp: {
          blue: "#003366",
          "blue-light": "#004488",
          "blue-dark": "#002244",
          gold: "#E8AA42",
          "gold-light": "#F5D998",
          "gold-dark": "#D4952E",
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
