import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: "var(--font-open-sans)",
        playfairDisplay: "var(--font-playfair-display)",
      },
      colors: {
        "pastel-cream": "#FFFAE5",
        "muted-gold": "#E3B23C",
        "pastel-blue": "#CCE5FF",
        "sky-blue": "#78A1BB",
        "pastel-green": "#D6F5CC",
        "sage-green": "#A3C9A8",
        "pastel-red": "#FFD6CC",
        "blush-red": "#E3968A",
        "charcoal-gray": "#333333",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
export default config;
