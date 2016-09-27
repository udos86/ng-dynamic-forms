var dateFormat = require("dateformat"),
    fs = require("fs"),
    path = require("path"),
    rollup = require("rollup").rollup,
    uglify = require("rollup-plugin-uglify"),
    license = fs.readFileSync("./LICENSE", "utf8"),
    now = Date.now();

module.exports = function (modules, entryRootPath, libraryName, globalsName, pkg, dest) {

    return function () {

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

                var result = bundle.generate({

                    banner: "/*!\n" + pkg.name + " " + pkg.version + " " + dateFormat(now, "UTC:yyyy-mm-dd HH:MM")
                    + " UTC\n" + license + "\n*/",
                    format: "umd",
                    globals: globals,
                    moduleName: `${globalsName}.${camelCase(moduleName)}`
                });

                var pathBundle = path.join(dest, moduleName, "bundles");

                if (!fs.existsSync(pathBundle)) {
                    fs.mkdirSync(pathBundle);
                }

                fs.writeFileSync(path.join(pathBundle,
                    minify ? `${moduleName}.umd.min.js` : `${moduleName}.umd.js`), result.code);
            });
        }

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
            "@angular2-material/slide-toggle": "md.slideToggle",

            "primeng/components/checkbox/checkbox": "primeng/components/checkbox/checkbox",
            "primeng/components/dropdown/dropdown": "primeng/components/dropdown/dropdown",
            "primeng/components/inputtext/inputtext": "primeng/components/inputtext/inputtext",
            "primeng/components/inputtextarea/inputtextarea": "primeng/components/inputtextarea/inputtextarea",
            "primeng/components/radiobutton/radiobutton": "primeng/components/radiobutton/radiobutton",
            "primeng/components/spinner/spinner": "primeng/components/spinner/spinner",

            "rxjs/Subject": "Rx",
            "rxjs/Subscription": "Rx"
        };

        modules.forEach(moduleName => {
            globals[`${libraryName}/${moduleName}`] = `${globalsName}.${camelCase(moduleName)}`;
        });

        return modules.reduce((previous, moduleName) => {

            return previous.then(() => Promise.all([bundle(moduleName, false), bundle(moduleName, true)]));

        }, Promise.resolve());
    }
};