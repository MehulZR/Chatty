import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        red: "var(--color-text-red)",
        green: "var(--color-text-green)",
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
        "toggle-background": "var(--color-toggle-background)",
      },
      colors: {
        "accent-purple": "var(--accent-purple)",
        "accent-rose-red": "var(--accent-rose-red)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
