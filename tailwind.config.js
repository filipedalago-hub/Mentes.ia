/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00AEEF',
        'neon-cyan': '#14F1FF',
        'neon-blue': '#0066FF',
        dark: '#0A0F2D',
        'dark-lighter': '#111936',
        titanium: '#2F3A4D',
        'soft-white': '#E6F1FF',
        'soft-gray': '#A9B9D6',
        'soft-muted': '#6B7A9F',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00AEEF 0%, #0066FF 100%)',
        'gradient-special': 'linear-gradient(135deg, #14F1FF 0%, #00AEEF 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0F2D 0%, #111936 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(20, 241, 255, 0.3)',
        'glow-md': '0 0 20px rgba(20, 241, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(20, 241, 255, 0.5)',
        'glow-primary': '0 0 20px rgba(0, 174, 239, 0.4)',
      },
    },
  },
  plugins: [],
};
