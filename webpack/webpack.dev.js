const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: () => {
                return [autoprefixer];
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  devServer: {
    port: process.env.PORT || 4000,
    contentBase: commonPaths.outputPath,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
