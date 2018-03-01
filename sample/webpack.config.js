const path            = require("path"),
      rxjsPathMapping = require("rxjs/_esm5/path-mapping"),
      ProgressPlugin  = require("webpack/lib/ProgressPlugin");

module.exports = {

    mode: "production",

    devtool: "source-map",

    context: __dirname,

    resolve: {

        extensions: [".ts", ".js"],

        modules: ["../dist", "../node_modules"],

        mainFields: ["browser", "module", "main"],

        alias: rxjsPathMapping()
    },

    output: {

        path: path.resolve(__dirname, "./dist"),

        filename: "bundle.js"
    },

    module: {

        rules: [
            {
                test: /\.(html|css)$/,
                loader: "raw-loader",
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [

        new ProgressPlugin()
    ]
};