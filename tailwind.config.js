/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070F',
        panel: '#0B1120',
        neon: '#00B4FF',
        violet2: '#7C5CFF',
        mint: '#00FFA3',
      },
      fontFamily: {
        display: ['Unbounded', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(0,180,255,.55)',
        card: '0 20px 80px -20px rgba(0,0,0,.7)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
