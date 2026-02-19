/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sp: {
          DEFAULT: "#029fde",
          50: "#eef9ff",
          100: "#d8f1ff",
          200: "#bae7ff",
          300: "#8bdbff",
          400: "#54c5ff",
          500: "#029fde",
          600: "#0084c4",
          700: "#016a9f",
          800: "#065983",
          900: "#0b4a6d",
          950: "#072f49",
        },
        ink: { DEFAULT: "#0d1117", light: "#484f58", muted: "#8b949e", faint: "#c6cdd5" },
        surface: { DEFAULT: "#ffffff", warm: "#fafaf9", cool: "#f6f8fa", dim: "#f0f2f4" },
      },
      fontFamily: {
        display: ["'DM Serif Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-down": "slideDown 0.35s ease-out",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
