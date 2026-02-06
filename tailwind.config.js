const theme = require('./src/styles/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './pages/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: {
        sans: [theme.fonts.primary],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-up': 'scaleUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '105': '1.05',
        '107': '1.07',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.zinc.700'),
            maxWidth: '65ch',
            h1: {
              color: theme('colors.zinc.900'),
            },
            h2: {
              color: theme('colors.zinc.900'),
            },
            h3: {
              color: theme('colors.zinc.900'),
            },
            strong: {
              color: theme('colors.zinc.900'),
            },
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
