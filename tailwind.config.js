/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#050C1A',
          900: '#0B1730',
          800: '#0F1E3D',
          700: '#16255A',
        },
        brand: {
          DEFAULT: '#1E3A8A',
          50: '#F4F7FD',
          100: '#E3E8F2',
          200: '#C6D5FA',
          400: '#5B84DD',
          500: '#3B5FD9',
          600: '#2947A3',
          700: '#1E3A8A',
          800: '#16255A',
        },
        status: {
          aman: '#15803D',
          proses: '#D97706',
          darurat: '#DC2626',
          info: '#2563EB',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,23,48,0.04), 0 8px 24px -12px rgba(11,23,48,0.12)',
        'card-hover': '0 4px 12px rgba(11,23,48,0.08), 0 16px 32px -12px rgba(11,23,48,0.18)',
      },
      backgroundImage: {
        'ribbon': 'linear-gradient(180deg, #0B1730 0%, #0F1E3D 22%, #16255A 40%, #223A78 58%, #3251A0 74%, #6B8FE0 88%, #FFFFFF 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #0F1E3D 0%, #0B1730 100%)',
        'page-glow': 'radial-gradient(circle at 15% 0%, #EAF1FC 0%, #F4F7FD 45%, #FFFFFF 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
