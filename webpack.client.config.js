const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = !isDevelopment;
const ROOT_PATH = path.join(__dirname);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  };

  if (isProduction) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin({
        terserOptions: { format: { comments: false } },
        extractComments: false
      })
    ];
  }

  return config;
};

const fileName = (ext) => `[name].[hash].${ext}`;

module.exports = {
  context: path.resolve(ROOT_PATH, "src"),
  entry: [
    isDevelopment && "react-hot-loader/patch",
    isDevelopment && "css-hot-loader/hotModuleReplacement",
    "client"
  ].filter(Boolean),
  output: {
    path: path.resolve(ROOT_PATH, "dist"),
    filename: fileName("js"),
    publicPath: "/"
  },
  resolve: {
    modules: ["src", "node_modules"],
    alias: { "react-dom": "@hot-loader/react-dom" },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    historyApiFallback: true
  },
  devtool: isDevelopment ? "source-map" : "none",
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(ROOT_PATH, "public", "index.html"),
      minify: {
        collapseWhitespace: isProduction,
        removeComments: isProduction
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(ROOT_PATH, "public", "assets", "favicon.ico"),
          to: path.resolve(ROOT_PATH, "dist")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: fileName("css")
    }),
    new LoadablePlugin(),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|jpeg|svg|gif|png|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]!static",
              outputPath: "fonts"
            }
          }
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
