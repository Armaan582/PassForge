/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "'Outfit'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
        body: ["'Outfit'", "sans-serif"],
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-med': 'floatMed 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spinReverse 9s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-up-fade': 'slideUpFade 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'char-pop': 'charPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'bar-fill': 'barFill 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'bounce-soft': 'bounceSoft 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbitReverse 15s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'copy-success': 'copySuccess 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'ring-ping': 'ringPing 1s cubic-bezier(0,0,0.2,1) forwards',
        'text-reveal': 'textReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-24px) rotate(3deg)' },
        },
        floatMed: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(-2deg)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slideUpFade: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        charPop: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.8)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        barFill: {
          from: { width: '0%' },
          to: { width: 'var(--target-width)' },
        },
        bounceSoft: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.94)' },
          '100%': { transform: 'scale(1)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        orbitReverse: {
          from: { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
          to: { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        copySuccess: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        ringPing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        textReveal: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0% 0 0)' },
        },
      },
    },
  },
  plugins: [],
}
