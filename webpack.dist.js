const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
const common = require("./webpack.common.js")
const {merge} = require("webpack-merge")
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const webpack = require("webpack")
const fs = require("fs")


class DeleteEverythingButZip {
    apply(compiler) {
        compiler.hooks.done.tap(
            "DeleteEverythingButZip", (stats) => {
                fs.readdirSync("dist").filter(name => name !== 'grade.zip').map(
                    name => fs.unlinkSync(path.resolve(__dirname, 'dist', name))
                )
            }
        )
    }
}

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CopyPlugin({
                patterns: [
                    {from: "src/distManifest.json", to: path.resolve(__dirname, "dist", "manifest.json")}
                ]
            }
        ),
        new ZipPlugin({
            filename: "grade.zip"
        }),
        new CleanWebpackPlugin({}),
        new DeleteEverythingButZip(),
    ],
    devtool: 'cheap-module-source-map',
})
