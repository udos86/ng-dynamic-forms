let pkg = require("./package.json"),
    path = require("path"),
    webpack = require("webpack");

module.exports = {

    entry: {
        "app": "./example/app/main.aot.js"
    },

    output: {

        path: path.resolve(__dirname, "./example/dist"),

        filename: "bundle.aot.js"
    },

    plugins: [

        //new webpack.optimize.UglifyJsPlugin({})

    ],
};