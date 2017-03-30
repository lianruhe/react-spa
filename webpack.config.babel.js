import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import _debug from 'debug'
import config, { paths } from './config'

const { __DEV__, __PROD__ } = config.globals
const debug = _debug('rrw:webpack')

debug('Create configuration.')

// https://webpack.js.org/how-to/upgrade-from-webpack-1/

const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    descriptionFiles: ['package.json'],
    mainFields: ['main', 'browser'],
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.json', '.css'],
    enforceExtension: false,
    enforceModuleExtension: false,
    alias: {
      styles: paths.src(`themes/${config.theme}`)
    }
  },
  resolveLoader: {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    mainFields: ['main'],
    mainFiles: ['index'],
    extensions: ['.js', '.jsx'],
    enforceExtension: false,
    enforceModuleExtension: false,
    moduleExtensions: ['-loader']
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: config.compiler_devtool,
  devServer: {
    host: config.server_host,
    port: config.server_port,
    // proxy is useful for debugging
    // proxy: {
    //   '/api': 'http://127.0.0.1:4040'
    // },
    compress: true,
    hot: true,
    noInfo: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    }
  },
  entry: {
    app: [
      paths.src('index.jsx'),
      `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`],
    vendor: config.compiler_vendor
  },
  output: {
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint',
        options: {
          emitWarning: __DEV__,
          formatter: require('eslint-friendly-formatter')
        },
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('postcss-cssnext'),
                  require('postcss-import'),
                  require('postcss-url')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /@[1-3]x\S*\.(png|jpg|gif)(\?.*)?$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        // do NOT base64encode @1x/@2x/@3x images
        exclude: /@[1-3]x/,
        loader: 'url',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.src('index.ejs'),
      title: `${config.pkg.name} - ${config.pkg.description}`,
      hash: false,
      inject: true,
      minify: {
        collapseWhitespace: config.compiler_html_minify,
        minifyJS: config.compiler_html_minify
      }
    }),
    new CopyWebpackPlugin([{
      from: paths.src('static')
    }], {
      // ignore: ['*.ico', '*.md']
    })
  ]
}

// ------------------------------------
// Plugins
// ------------------------------------

if (__PROD__) {
  debug('Enable plugins for production (Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css')
  )
} else {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
// if (!__TEST__) {
//   webpackConfig.plugins.push(
//     new FaviconsWebpackPlugin({
//       logo: paths.src('assets/logo.svg'),
//       prefix: 'icons-[hash:7]/',
//       icons: {
//         android: true,
//         appleIcon: true,
//         appleStartup: true,
//         coast: false,
//         favicons: true,
//         firefox: false,
//         opengraph: false,
//         twitter: false,
//         yandex: false,
//         windows: false
//       }
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       names: ['vendor']
//     })
//   )
// }

export default webpackConfig
