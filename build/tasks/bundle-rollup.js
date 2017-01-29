let dateFormat = require("dateformat"),
    fs = require("fs"),
    path = require("path"),
    rollup = require("rollup").rollup,
    uglify = require("rollup-plugin-uglify"),
    license = fs.readFileSync("./LICENSE", "utf8");

module.exports = function (modules, entryRootPath, libraryName, globalsName, pkg, dest) {

    return function () {

        let globals = {

            "@angular/common": "ng.common",
            "@angular/core": "ng.core",
            "@angular/forms": "ng.forms",
            "@angular/material": "ng.material",
            "@angular/http": "ng.http",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
            "@angular/router": "ng.router",
            "@ng2-dynamic-forms/core": "ng2DF.core",
            "@progress/kendo-angular-dateinputs": "progress/kendo-angular-dateinputs", // TODO
            "@progress/kendo-angular-dropdowns": "progress/kendo-angular-dropdowns", // TODO
            "@progress/kendo-angular-inputs": "progress/kendo-angular-inputs", // TODO
            "ng-semantic": "ng-semantic", // TODO
            "primeng/components/checkbox/checkbox": "primeng/components/checkbox/checkbox",
            "primeng/components/dropdown/dropdown": "primeng/components/dropdown/dropdown",
            "primeng/components/inputswitch/inputswitch": "primeng/components/inputswitch/inputswitch",
            "primeng/components/inputtext/inputtext": "primeng/components/inputtext/inputtext",
            "primeng/components/inputtextarea/inputtextarea": "primeng/components/inputtextarea/inputtextarea",
            "primeng/components/multiselect/multiselect": "primeng/components/multiselect/multiselect",
            "primeng/components/radiobutton/radiobutton": "primeng/components/radiobutton/radiobutton",
            "primeng/components/spinner/spinner": "primeng/components/spinner/spinner",
            "primeng/components/slider/slider": "primeng/components/slider/slider",
            "rxjs/Subject": "Rx",
            "rxjs/Subscription": "Rx"
        };

        function camelCase(string) {
            return string.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
        }

        function bundle(moduleName, minify) {

            return rollup({

                context: "window",
                entry: path.join(entryRootPath, moduleName, "index.js"),
                external: [...Object.keys(globals)],
                plugins: minify ? [uglify({
                    output: {
                        comments: (node, comment) => comment.value.startsWith("!")
                    }
                })] : []

            }).then(bundle => {

                let result = bundle.generate({

                    banner: `/*!\n${pkg.name} ${pkg.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`,
                    format: "umd",
                    globals: globals,
                    moduleName: `${globalsName}.${camelCase(moduleName)}`
                });

                let pathBundle = path.join(dest, moduleName, "bundles");

                if (!fs.existsSync(pathBundle)) {
                    fs.mkdirSync(pathBundle);
                }

                fs.writeFileSync(path.join(pathBundle,
                    minify ? `${moduleName}.umd.min.js` : `${moduleName}.umd.js`), result.code);
            });
        }

        modules.forEach(moduleName => {
            globals[`${libraryName}/${moduleName}`] = `${globalsName}.${camelCase(moduleName)}`;
        });

        return modules.reduce((previous, moduleName) => {

            return previous.then(() => Promise.all([bundle(moduleName, false), bundle(moduleName, true)]));

        }, Promise.resolve());
    }
};