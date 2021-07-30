const path = require('path');
const CopyPlugin = require("copy-webpack-plugin")
const {VueLoaderPlugin} = require('vue-loader')
require("@vue/compiler-sfc")
const webpack = require('webpack')

let config = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                'options': {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test:/\.(css|woff|ttf|png|svg)/i,
                type: 'asset'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    }
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
    entry: {
        popup: path.resolve(__dirname, 'src/popup.ts'),
        overviewPage: path.resolve(__dirname, 'src/overviewPage.ts'),
        background: path.resolve(__dirname, 'src/background.ts'),
        content: path.resolve(__dirname, 'src/contentScript.ts'),
    },
    output: {
        // assetModuleFilename: '[name][ext]',
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: ['.ts', '.vue', '.js'],
        alias:{
            "vue":"vue/dist/vue.esm-bundler.js",
            "core":path.resolve(__dirname, 'src/core'),
            "components":path.resolve(__dirname, 'src/components')
        }
    },
    // devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            "__VUE_PROD_DEVTOOLS__": false,
            "__VUE_OPTIONS_API__": true
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/html/popup.html", to: path.resolve(__dirname, "dist", "popup.html")},
                {from: "src/html/overviewPage.html", to: path.resolve(__dirname, "dist", "overviewPage.html")},
                {from: "assets/icon16.png", to: path.resolve(__dirname, "dist", "icon16.png")},
                {from: "assets/icon32.png", to: path.resolve(__dirname, "dist", "icon32.png")},
                {from: "assets/icon48.png", to: path.resolve(__dirname, "dist", "icon48.png")},
                {from: "assets/icon128.png", to: path.resolve(__dirname, "dist", "icon128.png")},
                {from: "assets/icon256.png", to: path.resolve(__dirname, "dist", "icon256.png")},
                {from: "assets/quicksand.ttf", to: path.resolve(__dirname, "dist", "quicksand.ttf")},
            ]
        }),
        new VueLoaderPlugin()
    ],
    stats:{
        errorDetails: true
    }
};

module.exports = config
