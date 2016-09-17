"use strict";

var dateFormat = require("dateformat"),
    fs = require("fs"),
    path = require("path"),
    now = Date.now(),
    rollup = require("rollup").rollup;

module.exports = function (modules, entryPath, libraryName, globalsName, pkg, dest) {

    return function () {

        function camelCase(string) {
            return string.replace(/-(\w)/g, function (_, letter) {
                return letter.toUpperCase();
            });
        }

        var license = fs.readFileSync("./LICENSE", "utf8");

        var globals = {

            "@angular/common": "ng.common",
            "@angular/core": "ng.core",
            "@angular/forms": "ng.forms",
            "@angular/http": "ng.http",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
            "@angular/router": "ng.router",

            "@angular2-material/checkbox": "md.checkbox",
            "@angular2-material/core": "md.core",
            "@angular2-material/input": "md.input",
            "@angular2-material/radio": "md.radio",

            "primeng/components/checkbox/checkbox": "primeng/components/checkbox/checkbox",
            "primeng/components/dropdown/dropdown": "primeng/components/dropdown/dropdown",
            "primeng/components/inputtext/inputtext": "primeng/components/inputtext/inputtext",
            "primeng/components/inputtextarea/inputtextarea": "primeng/components/inputtextarea/inputtextarea",
            "primeng/components/radiobutton/radiobutton": "primeng/components/radiobutton/radiobutton",
            "primeng/components/spinner/spinner": "primeng/components/spinner/spinner"
        };

        modules.forEach(moduleName => {
            globals[`${libraryName}/${moduleName}`] = `${globalsName}.${camelCase(moduleName)}`;
        });

        return modules.reduce((previous, moduleName) => {

            return previous.then(() => {

                return rollup({

                    context: "window",
                    entry: path.join(entryPath, moduleName, "index.js"),
                    external: [...Object.keys(globals)]

                }).then(bundle => {

                    var result = bundle.generate({

                        banner: `/* ${pkg.name} ${pkg.version} ${dateFormat(now, "UTC:yyyy-mm-dd HH:MM")} UTC ${license} */`,
                        format: "umd",
                        globals: globals,
                        moduleName: `${globalsName}.${camelCase(moduleName)}`
                    });

                    fs.writeFileSync(path.join(dest, moduleName, `${moduleName}.umd.js`), result.code);
                });
            });
        }, Promise.resolve());
    }
};
