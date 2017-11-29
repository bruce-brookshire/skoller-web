module.exports = {
  entry: ['./src/index.js', './src/styles/main.scss'],
  output: {
    path: __dirname,
    publicPath: '/',
    // assetsPublicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
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
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'] // compiles Sass to CSS
      }
    ]
  },
  plugins: []
}
