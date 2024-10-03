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
        "hero":"url('https://cdn.pixabay.com/photo/2016/11/29/05/42/beach-1867590_1280.jpg')",
        "palm":"url('/assets/PalmLeaf.avif')",
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
          100: '#F4D4C4',   // Light orange
          200: '#F0BBAA',
          300: '#ECA290',
          400: '#E88976',
          500: '#E4705C',
          600: '#E05749',
          700: '#DB4137',
          800: '#D62A25',
          900: '#DD5C3D'    // Burnt orange (darkest)
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
