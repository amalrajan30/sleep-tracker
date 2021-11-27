module.exports = {
  purge: ['./app/**/*.tsx', './app/**/*.jsx', './app/**/*.js', './app/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      height: {
        header: '50px',
      },
      gridTemplateColumns: {
        dashboard: '64% 1fr 1fr',
      },
      gridTemplateRows: {
        dashboard: '6rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
