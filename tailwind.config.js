/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette for AAC app
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // High contrast colors for accessibility
        accent: {
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
          blue: '#3b82f6',
        },
        // Background colors
        surface: {
          light: '#ffffff',
          DEFAULT: '#f8fafc',
          dark: '#1e293b',
          darker: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Lexend', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'symbol': ['1.125rem', { lineHeight: '1.25', fontWeight: '600' }],
        'symbol-lg': ['1.25rem', { lineHeight: '1.25', fontWeight: '600' }],
      },
      spacing: {
        'touch': '44px', // Minimum touch target size
        'touch-lg': '56px',
      },
      borderRadius: {
        'symbol': '12px',
      },
      boxShadow: {
        'symbol': '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
        'symbol-hover': '0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 8px 24px -4px rgba(0, 0, 0, 0.1)',
        'symbol-active': '0 1px 4px -1px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'tap': 'tap 0.15s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.2s ease-out',
      },
      keyframes: {
        tap: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

