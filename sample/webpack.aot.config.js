const path                  = require("path"),
      config                = require('./webpack.config.js'),
      merge                 = require("webpack-merge"),
      AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;

module.exports = merge(config, {

    context: __dirname,

    entry: {
        "app": "./main.jit.ts"
    },

    module: {

        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: "@ngtools/webpack"
            }
        ]
    },

    plugins: [

        new AngularCompilerPlugin({

            tsConfigPath: "./tsconfig.aot.json",

            mainPath: "./main.jit.ts",

            entryModule: "./app/app.module#AppModule",

            sourceMap: true
        })
    ]
});