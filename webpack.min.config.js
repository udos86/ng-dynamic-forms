var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var webpackConfig = require("./webpack.config.js");

module.exports = webpackMerge(webpackConfig, {

    plugins: [
        new webpack.optimize.UglifyJsPlugin({})
    ],

    output: {
        filename: "[name].umd.min.js"
    }
});