const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],

  theme: {
    extend: {
      colors: {
        'regal-blue': '#44403C',
        'white-happy': '#f1e9e9',
        'blue-happy': ' #bad4d5',
      },
      screens:{
        '3xl':'1600px',
      }
    },
  },
});
