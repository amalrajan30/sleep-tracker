module.exports = {
  content: ['./app/**/*.tsx', './app/**/*.jsx', './app/**/*.js', './app/**/*.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        header: '50px',
      },
      gridTemplateColumns: {
        dashboard: '64% 1fr',
      },
      gridTemplateRows: {
        dashboard: '1fr 1fr',
      },
    },
  },
  variants: {},
  plugins: [],
}
