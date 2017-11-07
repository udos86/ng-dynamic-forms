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

            tsConfigPath: path.resolve(__dirname, "./tsconfig.aot.json"),

            mainPath: path.resolve(__dirname, "./main.jit.ts"),

            entryModule: path.resolve(__dirname, "./app/app.module#AppModule"),

            sourceMap: true
        })
    ]
});