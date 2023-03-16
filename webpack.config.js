const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    filename: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    assetModuleFilename: "[name][ext]",
    clean: true,
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "My Web Page",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};
