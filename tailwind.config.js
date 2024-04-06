const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,tsx,ts,js,jsx,css,scss,sass,less,json}'],
  theme: {
    fontFamily: {
      sans: ['w95fa', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      transitionProperty: {
        height: 'height'
      },
      colors: {
        // you can either spread `colors` to apply all the colors
        ...colors,
        // or add them one by one and name whatever you want
        amber: colors.amber,
        emerald: colors.emerald
      }
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    plugin(function ({ addBase, config }) {
      addBase({
        body: {
          fontFamily: config('theme.fontFamily.sans')
        }
      })
    })
  ],
  corePlugins: {
    preflight: false
  }
}
