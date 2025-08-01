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
          50: '#f7f8f4',
          100: '#eef1e4',
          200: '#dce3ca',
          300: '#c3d0a3',
          400: '#a6b97a',
          500: '#8ca157',
          600: '#6b7c42',
          700: '#546235',
          800: '#434f2c',
          900: '#394327',
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
        'serif': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        'sans': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config