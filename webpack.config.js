const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PostCssSaveParser = require('postcss-safe-parser');

module.exports = () => {
    const development = process.env.NODE_ENV !== 'production';

    const config = {
        mode: development ? 'development' : 'production',
        entry: {
            index: ['./src/main.js'],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[hash:8].js',
        },
        devServer: {
            overlay: true,
        },
        resolve: {
            alias: {
                assets: path.resolve(__dirname, 'assets'),
            },
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            forceAllTransforms: !development,
                                            modules: false,
                                            useBuiltIns: false,
                                            debug: false,
                                        },
                                    ],
                                    [
                                        '@babel/preset-react',
                                        {
                                            development,
                                        },
                                    ],
                                ],
                                plugins: [
                                    ['@babel/plugin-proposal-class-properties', {loose: false}],
                                ]
                            }
                        }
                    ]
                }]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[hash:8].css',
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'public/index.html',
            }),
            ...(development ? [new webpack.HotModuleReplacementPlugin()] : []),
        ],
        devtool: development ? 'source-map' : false,
        optimization: {
            minimize: !development,
            noEmitOnErrors: !development,
            minimizer: [
                new TerserWebpackPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: false,
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            passes: 2,
                            inline: 2,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                        },
                    },
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {
                        parser: PostCssSaveParser,
                        map: false,
                        discardComments: {removeAll: true},
                    },
                }),
            ],
        },

    };

    return config

};