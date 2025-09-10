import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        statuapp: {
          primary:  "#D4AF37",
          secondary:"#E5E1D8",
          accent:   "#8C7A5A",
          neutral:  "#1A1A1C",
          "base-100":"#0B0B0D",
          "base-200":"#121214",
          "base-300":"#1B1C1F",
        },
      },
      "dark",
    ],
  },
};
