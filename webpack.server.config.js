const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const ROOT_PATH = path.join(__dirname);

module.exports = {
  name: "server",
  target: "node",
  node: { __dirname: false },
  entry: path.join(ROOT_PATH, "src", "server"),
  output: {
    filename: "server.js",
    libraryTarget: "commonjs2",
    path: path.resolve(ROOT_PATH, "dist"),
    publicPath: "/"
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  externals: [nodeExternals()],
  optimization: { nodeEnv: false },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{ loader: "null-loader" }]
      },
      {
        test: /\.(jpg|jpeg|svg|gif|png|ico)$/,
        use: [{ loader: "null-loader" }]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [{ loader: "null-loader" }]
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
