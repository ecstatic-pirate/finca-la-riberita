import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#f9d2cc',
          300: '#f3b1a7',
          400: '#ea8575',
          500: '#dd5b48',
          600: '#c74533',
          700: '#a73829',
          800: '#892f25',
          900: '#702b24',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dbe7',
          300: '#a7bdd3',
          400: '#7799ba',
          500: '#557ba2',
          600: '#436186',
          700: '#374f6c',
          800: '#30435b',
          900: '#2b3a4d',
        }
      },
      fontFamily: {
        'serif': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config