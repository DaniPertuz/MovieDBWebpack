const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: "development",
    devServer: {
        port: 3000,
        contentBase: "../dist",
        open: true,
        hot: true
    },
    target: "web",
    plugins: [
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
    devtool: "eval-source-map"
}

module.exports = merge(common, devConfig);