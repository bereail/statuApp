// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) * 1.3)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        statuapp: {
          primary: "hsl(var(--color-primary))",
          secondary: "hsl(var(--color-secondary))",
          accent: "hsl(var(--color-accent))",

          /* 👇 fondo global por tokens */
          "base-100": "hsl(var(--bg-base-100))",
          "base-200": "hsl(var(--bg-base-200))",
          "base-300": "hsl(var(--bg-base-300))",

          neutral: "#2a2a2a",
          info: "#38bdf8",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      "light",
    ],
    darkTheme: "statuapp",
  },
};

export default config;
