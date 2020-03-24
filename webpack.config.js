const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require("webpack");

module.exports = env => ({
  entry: {
    main: ['./js/main.js'],
    widget: ['./js/widget.js'],
    index: ['./js/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    publicPath: '/',
    compress: true,
    port: 9000,
    hot: true,
    before(app, server, compiler) {
      const watchFiles = ['.html', '.hbs'];

      compiler.plugin('done', () => {
        const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

        if (
          this.hot &&
          changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
        ) {
          server.sockWrite(server.sockets, 'content-changed');
        }
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BUILD_APP_ID: (env && env.app_id) ? `"${env.app_id}"` : undefined,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'views/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: 'views/main.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'widget.html',
      template: 'views/widget.html',
      chunks: ['widget']
    })
  ]
});
