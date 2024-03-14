const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      blue: {
        DEFAULT: "#1fb6ff",
        dark: "#0e77bd",
        light: "#7bd7ff",
        500: "#3b82f6",
        700: "#1d4ed8",
      },
      purple: {
        DEFAULT: "#7e5bef",
        dark: "#5c3da0",
        light: "#b69eff",
      },
      pink: {
        DEFAULT: "#ff49db",
        dark: "#d931a0",
        light: "#ff9ff2",
      },
      orange: {
        DEFAULT: "#ff7849",
        dark: "#d65230",
        light: "#ffad99",
      },
      green: {
        DEFAULT: "#13ce66",
        dark: "#0d9847",
        light: "#6fffb0",
      },
      yellow: {
        DEFAULT: "#ffc82c",
        dark: "#d6a000",
        light: "#ffe470",
      },
      gray: {
        darkest: "#273444",
        dark: "#8492a6",
        DEFAULT: "#d3dce6",
        light: "#f0f4f8",
        500: "#6b7280",
        600: "#4b5563",
        100: "#f3f4f6",
      },
      indigo: {
        500: "#6366f1",
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
        "4xl": "2rem",
      },
      boxShadow: {
        DEFAULT: "0 4px 6px rgba(0, 0, 0, 0.1)",
        md: "0 8px 12px rgba(0, 0, 0, 0.1)",
        lg: "0 16px 24px rgba(0, 0, 0, 0.1)",
        xl: "0 24px 32px rgba(0, 0, 0, 0.1)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
