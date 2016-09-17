var dateFormat = require("dateformat"),
    fs = require("fs"),
    path = require("path"),
    rollup = require("rollup").rollup,
    uglify = require("rollup-plugin-uglify"),
    now = Date.now();

module.exports = function (modules, entryRootPath, libraryName, globalsName, pkg, dest) {

    return function () {

        function camelCase(string) {

            return string.replace(/-(\w)/g, function (_, letter) {
                return letter.toUpperCase();
            });
        }

        function bundle(moduleName, _uglify) {

            return rollup({

                context: "window",
                entry: path.join(entryRootPath, moduleName, "index.js"),
                external: [...Object.keys(globals)],
                plugins: _uglify ? [uglify()] : []

            }).then(bundle => {

                var result = bundle.generate({

                    banner: `/* ${pkg.name} ${pkg.version} ${dateFormat(now, "UTC:yyyy-mm-dd HH:MM")} UTC ${license} */`,
                    format: "umd",
                    globals: globals,
                    moduleName: `${globalsName}.${camelCase(moduleName)}`
                });

                var pathBundle = path.join(dest, moduleName, "bundles");

                if (!fs.existsSync(pathBundle)) {
                    fs.mkdirSync(pathBundle);
                }

                fs.writeFileSync(path.join(pathBundle,
                    _uglify ? `${moduleName}.umd.min.js` : `${moduleName}.umd.js`), result.code);
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

            return previous.then(() => Promise.all([bundle(moduleName, false), bundle(moduleName, true)]));

        }, Promise.resolve());
    }
};