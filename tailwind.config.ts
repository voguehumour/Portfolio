import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507",
          900: "#0a0a0d",
          800: "#101015",
          700: "#15161c",
          600: "#1c1d25",
          500: "#272832",
        },
        graphite: {
          400: "#3a3b46",
          300: "#5a5b66",
          200: "#8a8b96",
          100: "#b4b5c0",
        },
        bone: "#f4f3ef",
        electric: {
          DEFAULT: "#5b8cff",
          glow: "#7ea2ff",
          deep: "#3a5fcc",
        },
        violet: {
          mist: "#9b87ff",
          deep: "#6748d9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-2": ["clamp(2.5rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-3": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        eyebrow: ["0.72rem", { lineHeight: "1", letterSpacing: "0.32em" }],
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-glow": "pulseGlow 3.6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-10%)" },
          "20%": { transform: "translate(-15%,5%)" },
          "30%": { transform: "translate(7%,-25%)" },
          "40%": { transform: "translate(-5%,25%)" },
          "50%": { transform: "translate(-15%,10%)" },
          "60%": { transform: "translate(15%,0)" },
          "70%": { transform: "translate(0,15%)" },
          "80%": { transform: "translate(3%,35%)" },
          "90%": { transform: "translate(-10%,10%)" },
        },
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(circle at 50% 40%, rgba(91,140,255,0.18) 0%, rgba(155,135,255,0.06) 40%, transparent 70%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.45'/></svg>\")",
      },
    },
  },
  plugins: [],
};

export default config;
