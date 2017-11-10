const config = require('./webpack.config.js'),
      merge  = require("webpack-merge");

module.exports = merge(config, {

    entry: {
        "app": "./main.jit.ts",
    },

    module: {

        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    "ts-loader?configFile=sample/tsconfig.jit.json",
                    "angular2-template-loader?keepUrl=true",
                    "angular-router-loader"
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            }
        ]
    }
});