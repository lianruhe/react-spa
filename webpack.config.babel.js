import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import _debug from 'debug'
import config, { paths } from './config'

const { __DEV__, __PROD__, __TEST__ } = config.globals
const debug = _debug('app:webpack')

debug('Create configuration.')

const appEntry = ['whatwg-fetch', paths.src('index.jsx')]
if (__DEV__) {
  appEntry.unshift(
    'react-hot-loader/patch',
    // `webpack-dev-server/client?http://localhost:${config.server_port}`,
    'webpack/hot/only-dev-server'
  )
}

const postcssLoaders = [
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
          require('postcss-import'),
          require('postcss-url'),
          // require('precss'),
          require('postcss-cssnext')({
            features: {
              customProperties: {
                variables: require(paths.src(`themes/${config.theme}/variables.json`))
              }
            }
          }),
          require('postcss-browser-reporter'),
          require('postcss-reporter')
        ]
      }
    }
  }
]

const lesscssLoaders = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: true
    }
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
      modifyVars: config.pkg.theme
    }
  }
]

const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    // descriptionFiles: ['package.json'],
    // mainFields: ['main', 'browser'],
    // mainFiles: ['index'],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    // enforceExtension: false,
    // enforceModuleExtension: false,
    alias: {
      styles: paths.src(`themes/${config.theme}`)
    }
  },
  // resolveLoader: {
  //   modules: ['node_modules'],
  //   descriptionFiles: ['package.json'],
  //   mainFields: ['main'],
  //   mainFiles: ['index'],
  //   extensions: ['.js', '.jsx'],
  //   enforceExtension: false,
  //   enforceModuleExtension: false
  // },
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
    app: appEntry,
    vendor: config.compiler_vendor
  },
  output: {
    path: paths.dist(__PROD__ ? 'static' : ''),
    publicPath: config.compiler_public_path,
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: __DEV__,
          formatter: require('eslint-friendly-formatter')
        },
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules[/\\](?!(opiece))/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: __PROD__ ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: postcssLoaders.slice(1)
        }) : postcssLoaders
      },
      {
        test: /\.less$/,
        use: __PROD__ ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: lesscssLoaders.slice(1)
        }) : lesscssLoaders
      },
      // {
      //   test: /\.(png|jpg|gif)(\?.*)?$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash:7]'
      //   }
      // },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        // exclude: /@[1-3]x/, // skip encoding @1x/@2x/@3x images with base64
        loader: 'url-loader',
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
      filename: `${__PROD__ ? '../' : ''}index.html`,
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
      from: paths.src('static'),
      to: paths.dist('static')
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
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    })
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
if (!__TEST__) {
  webpackConfig.plugins.push(
    new FaviconsWebpackPlugin({
      logo: paths.src('static/favicon.png'),
      prefix: 'icons-[hash:7]/',
      persistentCache: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

export default webpackConfig
