const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/pages/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  target: ['web', 'es5'],
  stats: 'errors-only',
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

const presets = [
  [
    "@babel/preset-env",
    {
      targets: "defaults, not IE 11, not dead",
      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = { presets };

{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  },
  "devDependencies": {
    "@babel/core": "^7.14.6",
    "@babel/preset-env": "^7.14.7",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.15.1",
    "css-loader": "^5.2.6",
    "html-webpack-plugin": "^5.3.2",
    "mini-css-extract-plugin": "^2.1.0",
    "style-loader": "^2.0.0",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  },
  "dependencies": {}
}
