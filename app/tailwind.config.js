import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans all your components
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
