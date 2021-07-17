const common = require("./webpack.common.js")
const {merge} = require("webpack-merge")
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")

const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            "IN_EXTENSION": false
        })
    ],
    target: 'node', // webpack should emit node.js compatible code
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder from bundling
})
