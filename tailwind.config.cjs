/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#06111f',
        panel: '#0d1b2e',
        ink: '#d8e7f3',
        sky: '#46d7ff',
        mint: '#39d98a',
        ember: '#ff9a4d',
        blush: '#ff5f6d',
        mist: '#9db3c7',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(120, 221, 255, 0.15), 0 18px 60px rgba(3, 10, 24, 0.45)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        noise:
          'radial-gradient(circle at 20% 20%, rgba(70, 215, 255, 0.10), transparent 28%), radial-gradient(circle at 80% 10%, rgba(255, 154, 77, 0.12), transparent 26%), radial-gradient(circle at 50% 100%, rgba(57, 217, 138, 0.08), transparent 30%)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseSlow: 'pulseSlow 3.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
      },
    },
  },
  plugins: [],
};
