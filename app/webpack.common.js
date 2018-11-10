const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');

const vendors = ['react'];

module.exports = {
    entry: {
        bundle: [
            'babel-polyfill',
            path.resolve(srcPath, 'index.js'),
        ],
        vendors,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    output: {
        path: distPath,
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        runtimeChunk: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                loader: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(jpg|png|gif)$/,
                include: srcPath,
                loader: 'file-loader',
            },
            {
                test: /\.svg$/,
                include: srcPath,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'svg-react-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    { cleanupEnableBackground: true },
                                    { collapseGroups: true },
                                    { convertTransform: true },
                                    { removeComments: true },
                                    { removeEmptyAttrs: true },
                                    { removeEmptyContainers: true },
                                    { removeEmptyText: true },
                                    { removeHiddenElems: true },
                                    { removeMetadata: true },
                                    { removeUnknownsAndDefaults: true },
                                    { removeUselessDefs: true },
                                    { removeUselessStrokeAndFill: true },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            Actions: path.resolve(srcPath, 'actions'),
            Apollo: path.resolve(__dirname, 'apollo'),
            Components: path.resolve(srcPath, 'components'),
            Config: path.resolve(srcPath, 'config'),
            Constants: path.resolve(srcPath, 'constants'),
            Containers: path.resolve(srcPath, 'containers'),
            Middleware: path.resolve(srcPath, 'middleware'),
            Models: path.resolve(srcPath, 'models'),
            Reducers: path.resolve(srcPath, 'reducers'),
            Selectors: path.resolve(srcPath, 'selectors'),
            Tests: path.resolve(srcPath, 'tests'),
            Utils: path.resolve(srcPath, 'utils'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(publicPath, 'index.html'),
            filename: 'index.html',
            inject: true,
            minify: {
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
        }),
    ],
};
