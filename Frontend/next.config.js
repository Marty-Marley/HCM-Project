const withCSS = require('@zeit/next-css')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = withCSS({
  cssModules: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true // true outputs JSX tags
          }
        }
      ]
    })

    return config
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
})
