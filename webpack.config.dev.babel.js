// Import all app configs
const appConfig = require('./config/main');
const appConfigDev = require('./config/dev');
const appConfigProduction = require('./config/prod');

import path from 'path';
import webpack from 'webpack';
import _ from 'lodash';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HhtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import yargs from 'yargs';

let argv = yargs.usage('Usage: $0 <command> [options]')
          .options({
            env: {
              type: 'string',
              default: 'development',
              describe: 'production | development'
            }
          }).argv;
let env = argv.env || argv.E;
let project = argv.project || 'project2';
function composeConfig(env) {
  if (env === 'development') {
    return _.merge({}, appConfig, appConfigDev);
  }

  if (env === 'production') {
    return _.merge({}, appConfig, appConfigProduction);
  }
}

module.exports = {
  target: "web",
  entry: {
    'main': `./projects/${project}/scripts/index.ts`,
    'critical': `./projects/${project}/scripts/critical.ts`,
    'assets': `./projects/${project}/assets.ts`
  },
  devtool: "inline-source-map",
  output: {
    publicPath: '/',
    path: path.join(__dirname, `dist/${project}`),
    filename: 'scripts/[name].app.js',
    chunkFilename: 'scripts/[name].chunk.js'
  },
  devServer: {
    contentBase: path.join(__dirname, `dist/${project}`),
    watchContentBase: true,
    compress: true,
    open: true,
    port: 9001,
  },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules/
        ],
        use: {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            configFile: 'tsconfig.module.json'
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: env === 'development' ? './config/sass-dev-var.scss' : './config/sass-prod-var.scss'
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          "pug-loader"
        ]
      },
      {
        test: /\.font\.js/,
        use: [
          'style-loader',
          'css-loader',
          'webfonts-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'commons': path.join(__dirname, 'commons/scripts')
    },
    extensions: ['.ts', '.tsx', '.js', '.vue', '.scss', '.json'],
    plugins: [new TsconfigPathsPlugin({configFile: 'tsconfig.module.json'})],
    modules: [ 'node_modules', 'bower_components']
  },
  plugins: [
    new webpack.DefinePlugin({
      __APP_CONFIG__: JSON.stringify(composeConfig(env)),
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `/projects/${project}/pug/home-page.pug`)
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `/projects/${project}/pug/home-page.pug`),
      filename: "home.html"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `/projects/${project}/pug/edito.pug`),
      filename: "edito.html"
    })
  ]
}

