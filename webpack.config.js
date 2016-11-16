let pkg = require("./package.json");
let license = require("fs").readFileSync("./LICENSE", "utf-8");
let webpack = require("webpack");
let dateformat = require("dateformat");
let now = Date.now();

module.exports = {

    entry: {
        "core": "./@ng2-dynamic-forms/core/index.js",
        "ui-basic": "./@ng2-dynamic-forms/ui-basic/index.js",
        "ui-bootstrap": "./@ng2-dynamic-forms/ui-bootstrap/index.js",
        "ui-foundation": "./@ng2-dynamic-forms/ui-foundation/index.js",
        "ui-material": "./@ng2-dynamic-forms/ui-material/index.js",
        "ui-primeng": "./@ng2-dynamic-forms/ui-primeng/index.js"
    },
    resolve: {
        extensions: ["", ".js"]
    },

    externals: {

        "@angular/common": {
            amd: "@angular/common",
            commonjs: "@angular/common",
            commonjs2: "@angular/common",
            root: ["ng", "common"]
        },
        "@angular/core": {
            amd: "@angular/core",
            commonjs: "@angular/core",
            commonjs2: "@angular/core",
            root: ["ng", "core"]
        },
        "@angular/forms": {
            amd: "@angular/forms",
            commonjs: "@angular/forms",
            commonjs2: "@angular/forms",
            root: ["ng", "forms"]
        },
        "@angular2-material/checkbox": {
            amd: "@angular2-material/checkbox",
            commonjs: "@angular2-material/checkbox",
            commonjs2: "@angular2-material/checkbox",
            root: ["md", "checkbox"]
        },
        "@angular2-material/core": {
            amd: "@angular2-material/core",
            commonjs: "@angular2-material/core",
            commonjs2: "@angular2-material/core",
            root: ["md", "core"]
        },
        "@angular2-material/input": {
            amd: "@angular2-material/input",
            commonjs: "@angular2-material/input",
            commonjs2: "@angular2-material/input",
            root: ["md", "input"]
        },
        "@angular2-material/radio": {
            amd: "@angular2-material/radio",
            commonjs: "@angular2-material/radio",
            commonjs2: "@angular2-material/radio",
            root: ["md", "radio"]
        },
        "@ng2-dynamic-forms/core": {
            amd: "@ng2-dynamic-forms/core",
            commonjs: "@ng2-dynamic-forms/core",
            commonjs2: "@ng2-dynamic-forms/core",
            root: ["dynamicForms", "core"]
        },
        "primeng/components/checkbox/checkbox": true,
        "primeng/components/dropdown/dropdown": true,
        "primeng/components/inputtext/inputtext": true,
        "primeng/components/inputtextarea/inputtextarea": true,
        "primeng/components/radiobutton/radiobutton": true,
        "primeng/components/spinner/spinner": true
    },

    plugins: [
        new webpack.BannerPlugin(
            `${pkg.name} ${pkg.version} ${dateformat(now, "UTC:yyyy-mm-dd HH:MM")} UTC ${license}`
        )
        // new webpack.optimize.UglifyJsPlugin({})
    ],

    output: {
        filename: "[name].umd.js",
        library: ["dynamicForms", "[name]"],
        libraryTarget: "umd",
        path: "./@ng2-dynamic-forms/",
        umdNamedDefine: true
    }
};