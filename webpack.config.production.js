const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['semantic-ui-react'],
    app: './src/index.js',
  },
  output: {
    filename: 'js/bundle.[hash].js',
    path: path.resolve(__dirname, 'docs'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new InjectManifest({
      swSrc: './public/service-worker.js',
      importsDirectory: 'js',
    }),
  ],
};
