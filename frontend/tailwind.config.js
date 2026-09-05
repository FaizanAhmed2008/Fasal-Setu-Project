/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF8',
          100: '#FAF7EF',
          200: '#F4EFE2',
        },
        forest: {
          50: '#F1F7F2',
          100: '#DCEBDD',
          200: '#B8D6BB',
          300: '#8BBA92',
          400: '#5F9B68',
          500: '#3F7E4A',
          600: '#2E6438',
          700: '#264F2D',
          800: '#1F3F25',
          900: '#15291A',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
        },
        leaf: {
          400: '#7BB87C',
          500: '#5BA15E',
        },
        amber: {
          muted: '#D4A24A',
        },
        danger: {
          50: '#FDECEC',
          100: '#FBDADA',
          200: '#F4B3B3',
          500: '#D96666',
          600: '#B94E4E',
        },
        info: {
          50: '#EEF4FA',
          100: '#D9E7F2',
          200: '#B0CDE3',
          500: '#5C8DB6',
          600: '#3F6E96',
        },
        warn: {
          50: '#FBF3E6',
          100: '#F6E6CC',
          200: '#ECCB99',
          500: '#D08A3F',
        },
        charcoal: {
          50: '#F6F6F5',
          100: '#E8E8E6',
          200: '#CFCECD',
          400: '#8B8B89',
          500: '#5E5E5C',
          600: '#3F3F3D',
          700: '#2A2A29',
          800: '#1B1B1A',
          900: '#0F0F0E',
        },
        slate: {
          muted: '#52555A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Manrope', 'Inter', 'system-serif'],
      },
      letterSpacing: {
        tightish: '-0.015em',
        tighter2: '-0.025em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,15,14,0.04), 0 4px 16px -4px rgba(15,15,14,0.06)',
        softer: '0 1px 2px rgba(15,15,14,0.03)',
        card: '0 1px 2px rgba(15,15,14,0.05), 0 8px 24px -8px rgba(15,15,14,0.08)',
        elev: '0 1px 2px rgba(15,15,14,0.06), 0 16px 40px -12px rgba(15,15,14,0.12)',
      },
      backgroundImage: {
        'grain': "radial-gradient(circle at 1px 1px, rgba(15,15,14,0.05) 1px, transparent 0)",
        'hero-warm': "radial-gradient(60% 50% at 50% 30%, rgba(212,162,74,0.10) 0%, rgba(212,162,74,0) 70%), radial-gradient(50% 60% at 80% 60%, rgba(63,126,74,0.08) 0%, rgba(63,126,74,0) 70%)",
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        floatySm: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        floatySm: 'floatySm 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
