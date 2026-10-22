/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0B10',
        'background-elevated': '#131319',
        surface: '#1A1A22',
        'surface-alt': '#20202A',
        border: '#2A2A35',
        primary: {
          DEFAULT: '#F5A623',
          dark: '#C97E0E',
        },
        accent: {
          pink: '#E8457C',
          orange: '#F5820B',
          yellow: '#F7C948',
          green: '#36B37E',
          purple: '#8E3EDB',
        },
        'text-primary': '#F5F5F7',
        'text-secondary': '#9A9AA5',
        'text-muted': '#6B6B76',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #E8457C, #F5820B, #F7C948, #36B37E, #8E3EDB)',
        'gold-gradient': 'linear-gradient(135deg, #F7C948, #F5A623)',
      },
    },
  },
  plugins: [],
};
