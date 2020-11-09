const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "js/[name].bundle.js",
    chunkFilename: "js/chuncks/[name].bundle.js",
  },
  devtool: "eval-source-map",
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    port: 1729,
    compress: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
    ],
  },
};
