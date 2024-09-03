import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1976D2",
        secondary: "#FBC02D",
        background: "#F5F5F5", 
        surface: "#FFFFFF",
        text: "#212121", 
        "text-secondary": "#757575", 
        border: "#E0E0E0", 
        success: '#4CAF50', 
        error: '#F44336', 
        "dark-primary": "#2196F3",
        "dark-secondary": "#FFEB3B", 
        "dark-background": "#121212", 
        "dark-surface": "#1E1E1E", 
        "dark-text": "#E0E0E0",
        "dark-text-secondary": "#BDBDBD", 
        "dark-border": "#333333", 
        "dark-success": "#66BB6A", 
        "dark-error": "#EF5350", 
      },
    },
  },
  plugins: [],
};
export default config;
