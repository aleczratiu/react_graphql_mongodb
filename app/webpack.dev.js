const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        clientLogLevel: 'none',
        contentBase: distPath,
        historyApiFallback: {
            disableDotRule: true,
        },
        hot: true,
        host: '0.0.0.0',
        port: 3000,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                include: srcPath,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: '[name]_[local]',
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
