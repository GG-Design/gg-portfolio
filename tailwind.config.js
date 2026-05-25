/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#09090b",
        card:       "#18181b",
        surface:    "#18181b",
        "border-subtle": "#27272a",
        cyan:   { DEFAULT: "#06B6D4", 500: "#06B6D4" },
        violet: { DEFAULT: "#8B5CF6", 500: "#8B5CF6" },
      },
      animation: {
        "marquee":         "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}
