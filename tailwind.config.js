/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07111f",
        surface: "#0d1728",
        card: "#101c31",
        line: "rgba(255,255,255,0.08)",
        brand: {
          50: "#eef7ff",
          100: "#d9eeff",
          200: "#b7ddff",
          300: "#8ec7ff",
          400: "#5fa5ff",
          500: "#337ef0",
          600: "#2561d7",
          700: "#1d4cb0",
          800: "#193f8a",
          900: "#17366f"
        },
        accent: {
          50: "#fff7e6",
          100: "#ffeac0",
          200: "#ffd48a",
          300: "#ffb94d",
          400: "#ff9d1a",
          500: "#f08400",
          600: "#c96b00",
          700: "#a75502",
          800: "#834301",
          900: "#693700"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 70px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at 20% 20%, rgba(51,126,240,0.16), transparent 26%), radial-gradient(circle at 80% 0%, rgba(255,157,26,0.12), transparent 22%), radial-gradient(circle at 90% 80%, rgba(93,201,255,0.12), transparent 18%), linear-gradient(180deg, #07111f 0%, #09111d 38%, #0b1322 100%)"
      }
    }
  },
  plugins: [],
};
