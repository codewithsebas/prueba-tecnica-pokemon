import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "c-pink": "#F9A8D4",
        "c-blue": "#93C5FD",
        "c-green": "#A7F3D0",
      },
      animation: {
        twinkle: 'twinkle 2s infinite ease-in-out',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        driftSlow: 'drift 12s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-10px, 15px)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -10px)' },
        },
      },
      
    },
  },
  plugins: [],
} satisfies Config;
