import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'Arial', 'sans-serif'],
      },
      colors: {
        team: {
          red: '#ef4444',
          blue: '#3b82f6',
          green: '#22c55e',
          yellow: '#facc15',
          purple: '#a855f7',
          orange: '#f97316',
        },
        board: {
          tile: '#334155',
          tileActive: '#475569',
          path: '#1e293b',
        },
        timer: {
          normal: '#22c55e',
          warning: '#facc15',
          urgent: '#ef4444',
        },
      },
      animation: {
        'pulse-urgent': 'pulseUrgent 0.6s ease-in-out infinite',
      },
      keyframes: {
        pulseUrgent: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(239, 68, 68, 0.3)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
