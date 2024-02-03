const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function loaders () {
  return [
        {
          test: /\.(html)$/,
          use: ['html-loader']
        },
        {
          test: /\.(css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[contenthash][ext]',
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[contenthash][ext]',
          },
        },
        {
          test: /\.(ico|webmanifest)/,
          type: 'asset/resource',
        },
  ]
}