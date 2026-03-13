/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#FF6584",
        dark: { DEFAULT: "#0F0F1A", card: "#1A1A2E", sidebar: "#16213E", border: "#2D2D4E" },
        success: "#48BB78",
        warning: "#ECC94B",
        danger: "#FC8181",
        live: "#FF4444",
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)",
        "grad-dark": "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        "grad-card": "linear-gradient(145deg, rgba(108,99,255,0.1) 0%, rgba(255,101,132,0.05) 100%)",
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
