const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/app/index.tsx",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].js",
      publicPath: isProd ? "./" : "/",
      clean: true,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    module: {
      rules: [
        // TypeScript + JSX
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        // SCSS
        {
          test: /\.module\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isProd ? "[hash:base64:8]" : "[name]__[local]--[hash:base64:5]",
                  exportLocalsConvention: "camelCase",
                },
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: "Nesine - Case Study",
      }),
      new CopyPlugin({
        patterns: [
          { from: "public", to: ".", globOptions: { ignore: ["**/index.html"] } },
        ],
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
        }),
    ].filter(Boolean),

    optimization: isProd
      ? {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: { pure_funcs: ["console.log", "console.debug", "console.info"] },
                output: { comments: false },
              },
            }),
            new CssMinimizerPlugin(),
          ],
          runtimeChunk: "single",
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-redux|@reduxjs)[\\/]/,
                name: "react-vendor",
                priority: 20,
              },
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                priority: 10,
              },
            },
          },
        }
      : undefined,

    devServer: {
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },

    devtool: isProd ? "source-map" : "eval-source-map",

    performance: {
      hints: isProd ? "warning" : false,
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
    },
  };
};
