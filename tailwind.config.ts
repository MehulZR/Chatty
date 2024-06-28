import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        red: "var(--color-text-red)",
        green: "var(--color-text-green)",
      },
      placeholderColor: {
        secondary: "var(--color-text-secondary)",
      },
      borderColor: {
        primary: "var(--color-border)",
        secondary: "var(--color-border-dark)",
      },
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        tertiary: "var(--color-bg-tertiary)",
        blue: "var(--color-bg-blue)",
        purple: "var(--color-bg-purple)",
        red: "var(--color-bg-red)",
        "toggle-background": "var(--color-toggle-background)",
      },
      colors: {
        "accent-purple": "var(--accent-purple)",
        "accent-rose-red": "var(--accent-rose-red)",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "class",
};
export default config;
