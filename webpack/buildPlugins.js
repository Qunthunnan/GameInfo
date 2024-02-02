const HtmlWebpackPlugin = require('html-webpack-plugin'),
      ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function plugins() {
    return  [
            new HtmlWebpackPlugin({
              template: './src/index.html',
              inject: 'body',
              scriptLoading: 'defer',
            }),
            new MiniCssExtractPlugin({
              filename: 'css/style.css',
            }),
            new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["mozjpeg", { progressive: true, quality: 90 }],
                    ["optipng", { optimizationLevel: 5 }],  
                    [
                      "svgo",
                      {
                        plugins: [
                          {
                            name: "preset-default",
                            params: {
                              overrides: {
                                removeViewBox: false,
                                addAttributesToSVGElement: {
                                  params: {
                                    attributes: [
                                      { xmlns: "http://www.w3.org/2000/svg" },
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
            }),
            // new BundleAnalyzerPlugin(),
          ]
}