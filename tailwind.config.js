/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8914E',
          light:   '#C9A96E',
          dark:    '#A07840',
        },
        brand: {
          red:   '#D0021B',
          blue:  '#007AFF',
          green: '#34C759',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E, #A07840)',
      },
      fontFamily: {
        sans: ["'Helvetica Neue'", 'Helvetica', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(40px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      animation: {
        'slide-up':  'slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1) both',
        'pulse2':    'pulse2 1.2s ease-in-out infinite',
        'spin-slow': 'spin 1s linear infinite',
        'fade-in':   'fadeIn 0.2s ease both',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'card':     '0 1px 8px rgba(0, 0, 0, 0.06)',
        'card-dark':'0 1px 8px rgba(0, 0, 0, 0.40)',
        'sheet':    '0 -4px 30px rgba(0, 0, 0, 0.10)',
        'sheet-dark':'0 -4px 30px rgba(0, 0, 0, 0.50)',
        'map':      '0 2px 16px rgba(0, 0, 0, 0.10)',
        'map-dark': '0 2px 16px rgba(0, 0, 0, 0.50)',
        'sos':      '0 4px 20px rgba(208, 2, 27, 0.35)',
        'gold':     '0 4px 16px rgba(184, 145, 78, 0.40)',
      },
    },
  },
  plugins: [],
}
