const path    = require("path"),
      webpack = require("webpack");

module.exports = {

    entry: {
        "app": "./sample/aot/sample/app/main.aot.js"
    },

    resolve: {
        modules: ["dist", "node_modules"]
    },

    output: {

        path: path.resolve(__dirname, "./sample/dist"),

        filename: "bundle.aot.js"
    },

    //devtool: "source-map",

    plugins: [

        new webpack.optimize.UglifyJsPlugin({

            sourceMap: false,

            mangle: {
                //except: ['customValidator']
            }
        })
    ]
};