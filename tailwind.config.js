import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        content1: "rgb(var(--content1) / <alpha-value>)",
        content2: "rgb(var(--content2) / <alpha-value>)",
        divider: "rgb(var(--divider) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        }
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px",
        disabledOpacity: 0.45,
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        radius: {
          small: "0.375rem",
          medium: "0.5rem",
          large: "0.75rem",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: "#CDEB63",
          }
        },
        dark: {
          colors: {
            background: "#09090B",
            foreground: "#FFFFFF",
            primary: "#CDEB63",
          }
        }
      }
    })
  ],
};
