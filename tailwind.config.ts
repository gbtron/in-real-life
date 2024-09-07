import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors : {
        'camo': {
          100: '#efeedb',
          200: '#e7e7ce',
          300: '#dedfc2',
          400: '#d5d7b5',
          500: '#cdcfaa',
          600: '#c4c79e',
          700: '#bcbf93',
          800: '#b3b788',
          900: '#a9ae7e'
        }, 
        'burntOrange': {
          100: '#DD5C3D',
          200: '#D4563A',
          300: '#CC5138',
          400: '#C44C35',
          500: '#BC4732',
          600: '#B4422F',
          700: '#AC3D2C',
          800: '#A4382A',
          900: '#9C3327'
        },
        'brown': {
          100: '#534742',
          200: '#5E4D48',
          300: '#6A5950',
          400: '#776459',
          500: '#847162',
          600: '#927D6B',
          700: '#A08A74',
          800: '#AE977E',
          900: '#BCA588'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class', 
};
export default config;
