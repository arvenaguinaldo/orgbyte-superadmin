const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'webpackBundle-[chunkhash].js',
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
                localIdentName: '[local]___[hash:base64:5]',
                minimize: true
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
                importLoaders: 1,
                localIdentName: '[local]',
                minimize: true
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ExtractTextPlugin('webpackBundle-[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('prod')
      }
    }),
    new UglifyJSPlugin()
  ]
};
