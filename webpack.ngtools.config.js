const path                  = require("path"),
      AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;

module.exports = {

    entry: {
        "app": "./sample/app/main.jit.js"
    },

    resolve: {
        modules: ["dist", "node_modules"]
    },

    output: {

        path: path.resolve(__dirname, "./sample/dist"),

        filename: "bundle.aot.js"
    },

    module: {

        rules: [
            {
                test: /\.(html)$/,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: "@ngtools/webpack"
            }
        ]
    },

    plugins: [

        new AngularCompilerPlugin({

            tsConfigPath: "./tsconfig.sample.json",

            entryModule: "./sample/app/app.module#AppModule"
        })
    ]
};