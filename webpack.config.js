var package = require("./package.json");
var webpack = require("webpack");
var dateformat = require("dateformat");
var now = Date.now();

module.exports = {

    entry: {
        "@ng2-dynamic-forms/core/core": "./@ng2-dynamic-forms/core/index.js",
        "@ng2-dynamic-forms/ui-basic/ui-basic": "./@ng2-dynamic-forms/ui-basic/index.js",
        "@ng2-dynamic-forms/ui-bootstrap/ui-bootstrap": "./@ng2-dynamic-forms/ui-bootstrap/index.js",
        "@ng2-dynamic-forms/ui-foundation/ui-foundation": "./@ng2-dynamic-forms/ui-foundation/index.js",
        "@ng2-dynamic-forms/ui-material/ui-material": "./@ng2-dynamic-forms/ui-material/index.js",
        "@ng2-dynamic-forms/ui-primeng/ui-primeng": "./@ng2-dynamic-forms/ui-primeng/index.js"
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
    },

    plugins: [
        new webpack.BannerPlugin(
            `${package.name} ${package.version} ${dateformat(now, "dd.mm.yyyy HH:MM")} © ${package.author.name} ${dateformat(now, "yyyy")}`
        )
    ],

    output: {
        filename: "[name].umd.js",
        library: ['@ng2-dynamic-forms', '[name]'],
        libraryTarget: 'umd',
        path: './'
        //umdNamedDefine: '[name]'
    }
};