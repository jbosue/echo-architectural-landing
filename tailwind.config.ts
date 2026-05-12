import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        graphite: '#050505',
        bone: '#f4f1ea',
        ash: '#b8b4aa',
        smoke: '#73706a',
      },
      letterSpacing: {
        cinematic: '-0.075em',
        label: '0.22em',
      },
      boxShadow: {
        material: '0 40px 140px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
