const autoprefixer = require('autoprefixer')

module.exports = {
  entry: ['./src/index.js', './src/styles/main.scss'],
  output: {
    path: __dirname,
    publicPath: '/',
    // assetsPublicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'resolve-url-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|ico|jpe?g|png|gif)$/,
        loader: 'url-loader?name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ] // compiles Sass to CSS
      }
    ]
  },
  plugins: []
}
