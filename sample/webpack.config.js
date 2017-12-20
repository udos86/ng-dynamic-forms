const path            = require("path"),
      webpack         = require("webpack"),
      rxjsPathMapping = require("rxjs/_esm5/path-mapping"),
      ProgressPlugin  = require("webpack/lib/ProgressPlugin");

module.exports = {

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

        new webpack.NoEmitOnErrorsPlugin(),

        new ProgressPlugin(),

        new webpack.optimize.UglifyJsPlugin({

            sourceMap: false,

            mangle: {
                //except: ['customValidator']
            }
        })
    ]
};