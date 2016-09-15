var package = require("./package.json");
var license = require("fs").readFileSync("./LICENSE", "utf-8");
var webpack = require("webpack");
var dateformat = require("dateformat");
var now = Date.now();

module.exports = {

    entry: {
        "@ng2-dynamic-forms/core/bundles/core": "./@ng2-dynamic-forms/core/index.js",
        "@ng2-dynamic-forms/ui-basic/bundles/ui-basic": "./@ng2-dynamic-forms/ui-basic/index.js",
        "@ng2-dynamic-forms/ui-bootstrap/bundles/ui-bootstrap": "./@ng2-dynamic-forms/ui-bootstrap/index.js",
        "@ng2-dynamic-forms/ui-foundation/bundles/ui-foundation": "./@ng2-dynamic-forms/ui-foundation/index.js",
        "@ng2-dynamic-forms/ui-material/bundles/ui-material": "./@ng2-dynamic-forms/ui-material/index.js",
        "@ng2-dynamic-forms/ui-primeng/bundles/ui-primeng": "./@ng2-dynamic-forms/ui-primeng/index.js"
    },
    resolve: {
        extensions: ["", ".js"]
    },

    externals: {
        "@angular/common": true,
        "@angular/compiler": true,
        "@angular/core": true,
        "@angular/forms": true,
        "@angular/http": true,
        "@angular/platform-browser": true,
        "@angular/platform-browser-dynamic": true,
        "@angular/router": true,
        "@angular2-material/checkbox": true,
        "@angular2-material/core": true,
        "@angular2-material/input": true,
        "@angular2-material/radio": true,
        "@ng2-dynamic-forms/core": true,
        "primeng/components/checkbox/checkbox": true,
        "primeng/components/dropdown/dropdown": true,
        "primeng/components/inputtext/inputtext": true,
        "primeng/components/inputtextarea/inputtextarea": true,
        "primeng/components/radiobutton/radiobutton": true,
        "primeng/components/spinner/spinner": true
    },

    plugins: [
        new webpack.BannerPlugin(
            `${package.name} ${package.version} ${dateformat(now, "UTC:yyyy-mm-dd HH:MM")} UTC ${license}`
        )
        //new webpack.optimize.UglifyJsPlugin({})
    ],

    output: {
        filename: "[name].umd.js",
        library: ["ng2-dynamic-forms", "[name]"],
        libraryTarget: "umd",
        path: "./"
        //umdNamedDefine: '[name]'
    }
};