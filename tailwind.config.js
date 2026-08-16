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
          950: '#0A1730',
          900: '#0B1D51',
          800: '#122a6b',
        },
        brand: {
          DEFAULT: '#1E3A8A',
          50: '#EAF1FC',
          100: '#D6E4FA',
          200: '#AFC9F2',
          400: '#5B84DD',
          500: '#3B62C4',
          600: '#2947A3',
          700: '#1E3A8A',
          800: '#162C68',
        },
        status: {
          aman: '#16A34A',
          proses: '#F59E0B',
          darurat: '#DC2626',
          info: '#2563EB',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,29,81,0.04), 0 8px 24px -12px rgba(11,29,81,0.12)',
        'card-hover': '0 4px 12px rgba(11,29,81,0.08), 0 16px 32px -12px rgba(11,29,81,0.18)',
      },
      backgroundImage: {
        'ribbon': 'linear-gradient(115deg, #0B1D51 0%, #1E3A8A 32%, #3B62C4 58%, #AFC9F2 82%, #FFFFFF 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #0B1D51 0%, #122a6b 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
