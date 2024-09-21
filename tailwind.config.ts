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
        "palm":"url('/assets/PalmLeaf.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        '25%':'25%',
        '70%':'70%'
      },
      colors : {
        'beige': {
          100: '#EAE2D4',
          200: '#DDD1BE',
          300: '#D0C1A9',
          400: '#C8B29A',  
          500: '#BFA78F',
          600: '#B69C84',
          700: '#AC927A',
          800: '#A3876F',
          900: '#9A7D65'
        }, 
        'tangerine': {
          100: '#F7E6DE',   // Light orange
          200: '#F4D4C4',
          300: '#ECA290',
          400: '#E88976',
          500: '#E4705C',
          600: '#E05749',
          700: '#DB4137',
          800: '#D62A25',
          900: '#DD5C3D'    // Burnt orange (darkest)
        },
        'brown': {
          100: '#BCA588', // lightest
          200: '#AE977E',
          300: '#A08A74',
          400: '#927D6B',
          500: '#847162',
          600: '#776459',
          700: '#6A5950',
          800: '#534742',
          900: '#332b28'  // darkest
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class', 
};
export default config;
