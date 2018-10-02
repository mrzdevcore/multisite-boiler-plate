import path from 'path';
import webpack from 'webpack';
import _ from 'lodash';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import yargs from 'yargs';
import GenerateHtml from './scripts/generate-html.balel';

import Config from './config/main';

let argv = yargs.usage('Usage: $0 <command> [options]')
          .options({
            env: {
              type: 'string',
              default: 'development',
              describe: 'production | development'
            },
            project: {
              type: 'string',
              default: 'project2',
              describe: 'name of project'
            }
          }).argv;

let env = argv.env || argv.E;
let project = argv.project || argv.P;

const config = new Config().generate(env);

module.exports = {
  target: "web",
  entry: {
    'main': `./projects/${project}/scripts/index.ts`,
    'critical': `./projects/${project}/scripts/critical.ts`,
    'assets': `./projects/${project}/assets.ts`
  },
  devtool: "source-map",
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
  mode: env,
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
          MiniCssExtractPlugin.loader,
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
          "pug-loader?pretty"
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
          {
            loader: 'file-loader',
            options: {
              name: "image/[name].[ext]",
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
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
      __APP_CONFIG__: JSON.stringify(config),
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css"
    })
  ].concat(GenerateHtml(project))
}

