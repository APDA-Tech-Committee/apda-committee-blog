/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueprint: {
          blue: '#0057FF',
          orange: '#FF7A45',
          grid: '#ECECEC',
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.9)',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        bg: {
          primary: '#FAFAFA',
          grid: '#ECECEC',
        }
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        'body': ['Inter', 'ui-sans-serif', 'system-ui'],
        'mono': ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'grid': "url(\"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0H0v12h12V0z' fill='none' stroke='%23ECECEC' stroke-opacity='0.4' stroke-width='1'/%3E%3C/svg%3E\")",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgba(0, 0, 0, 0.9)',
            a: {
              color: '#0057FF',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
