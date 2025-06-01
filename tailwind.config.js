/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color
        primary: {
          DEFAULT: '#5C2E91', // Royal Plum - Bold luxury feel for CTAs and key sections
        },
        // Accent colors
        accent: {
          gold: '#E7C36F',    // Champagne Gold - For borders, icons, highlights
          rose: '#F8D9E0',    // Blush Rose - For backgrounds or avatar skins
        },
        // Background colors
        background: {
          DEFAULT: '#FDF8F5', // Soft Ivory - Clean, premium backdrop
          dark: '#1F1F1F',    // Midnight Charcoal - For dark theme or overlays
        },
        // Text colors
        text: {
          primary: '#2C2C2C', // Charcoal Black - For main text, high contrast
          secondary: '#757575', // Ash Grey - For subtitles and UI hints
        },
      },
    },
  },
  plugins: [],
}