const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '../'),
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'webpackBundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
      'static'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015', 'react', 'stage-0'
          ],
          plugins: ['transform-runtime']
        },
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/immutable-treeutils')
        ]
      },
      {
        test: /\.js?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                includePaths: [path.resolve(__dirname, '../src/styles')]
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]'
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    stats: 'minimal',
    port: process.env.PORT || 8888
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/devIndex.html'),
      filename: 'index.html'
    }),
    new LiveReloadPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve(__dirname, '../node_modules')),
    new ExtractTextPlugin('webpackBundle.css'),
    new StyleLintPlugin(),
    new webpack.DefinePlugin({
      OMS_API_PORT: process.env.OMS_API_PORT,
      BACKEND_API_PORT: process.env.BACKEND_API_PORT
    })
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
