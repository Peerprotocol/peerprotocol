import { JetBrains_Mono } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '2xl': '1441px',
      },
      colors: {
        green: {
          DEFAULT: "#11D984",
        },
        background: 'var(--bg-color)',
        text: 'var(--text-color)',
        secondaryBg: 'var(--secondary-bg-color)',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        jetbrains: ['JetBrains Mono'],
        notoserif: ['Noto Serif'],
        opensans: ['Open Sans'],

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom': '10px 10px 0px 0px #000',
        'custom2': '5px 4px 0px 0px #000',
      },
    },
  },
  plugins: [],
};
export default config;
