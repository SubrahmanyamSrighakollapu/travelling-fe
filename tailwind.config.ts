import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
      },
      maxWidth: {
        layout: "1400px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.05)",
        md: "0 10px 24px rgba(15, 23, 42, 0.10), 0 4px 12px rgba(15, 23, 42, 0.05)",
        lg: "0 18px 44px rgba(15, 23, 42, 0.14), 0 8px 20px rgba(15, 23, 42, 0.08)",
        xl: "0 24px 64px rgba(15, 23, 42, 0.18), 0 12px 28px rgba(15, 23, 42, 0.10)",
        "2xl": "0 32px 88px rgba(15, 23, 42, 0.22), 0 16px 36px rgba(15, 23, 42, 0.12)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        aurora: "aurora-spin 20s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(5, 150, 105, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(5, 150, 105, 0.6)" },
        },
        "aurora-spin": {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
