"use strict";
var util = require("gulp-util"),
    Builder = require("systemjs-builder");

module.exports = function () {

    return function (done) {

        var builder = new Builder({

            map: {
                "modules": "modules"
            },
            packages: {
                "modules": {
                    defaultExtension: "js"
                }
            }
        });

        builder.buildStatic("modules/core/index.js", "bundles/core.umd.js", {

            externals: [
                "@angular/common",
                "@angular/compiler",
                "@angular/core",
                "@angular/forms",
                "@angular/http",
                "@angular/platform-browser",
                "@angular/platform-browser-dynamic",
                "@angular/router",
                "@angular2-material/checkbox",
                "@angular2-material/core",
                "@angular2-material/input",
                "@angular2-material/radio",
                "@ng2-dynamic-forms/core"
            ]
        }).then(function () {done();});
    }
};