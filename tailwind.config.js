/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    height: {
      screen: "100svh",
      full: "100%",
      0.5: "0.125rem" /* 2px */,
      60: "15rem" /* 240px */,
    },
    minHeight: {
      screen: "100svh",
      full: "100%",
    },
    maxHeight: {
      screen: "100svh",
      full: "100%",
    },
    extend: {
      colors: {
        foreground: "var(--foreground-color)" /* White */,
        background: "var(--background-color)" /* Black */,
        primary_50: "var(--primary-color-50)" /* Gray 50 */,
        primary_100: "var(--primary-color-100)" /* Gray 100 */,
        primary_200: "var(--primary-color-200)" /* Gray 200 */,
        primary_300: "var(--primary-color-300)" /* Gray 300 */,
        primary_400: "var(--primary-color-400)" /* Gray 400 */,
        primary_500: "var(--primary-color-500)" /* Gray 500 */,
        primary_600: "var(--primary-color-600)" /* Gray 600 */,
        primary_700: "var(--primary-color-700)" /* Gray 700 */,
        primary_800: "var(--primary-color-800)" /* Gray 800 */,
        primary_900: "var(--primary-color-900)" /* Gray 900 */,
        primary_950: "var(--primary-color-950)" /* Gray 950 */,
      },
    },
  },
  plugins: [],
};
