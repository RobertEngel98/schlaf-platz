/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0B2545",
          "primary-light": "#163766",
          "primary-mid": "#1E4A80",
          accent: "#E8AA42",
          "accent-light": "#F5D998",
          "accent-dark": "#D4952E",
          surface: "#F7F5F0",
          "surface-alt": "#EDE9E1",
          success: "#2D8A4E",
          "success-light": "#E8F5E9",
          error: "#C62828",
        },
      },
      fontFamily: {
        display: ["'DM Sans'", "system-ui", "sans-serif"],
        body: ["'Source Sans 3'", "'Segoe UI'", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeInUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-down": "slideDown 0.4s ease",
        "scale-in": "scaleIn 0.5s ease",
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { transform: "scale(0)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
