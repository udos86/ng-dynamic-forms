let dateFormat = require("dateformat"),
    fs = require("fs"),
    path = require("path"),
    gulp = require("gulp"),
    gulpRollup = require('gulp-better-rollup'),
    uglify = require("rollup-plugin-uglify"),
    license = fs.readFileSync("./LICENSE", "utf8");

module.exports = function (entryRootPath, moduleName, globalsName, pkg, dest) {

    function camelCase(string) {
        return string.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
    }

    return function () {

        const globals = {

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
            "primeng/components/autocomplete/autocomplete": "primeng/components/autocomplete/autocomplete",
            "primeng/components/calendar/calendar": "primeng/components/calendar/calendar",
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

        function getOptions(minify) {

            return {
                context: "this",
                external: Object.keys(globals),
                plugins: minify ? [
                        uglify({
                            output: {
                                comments: (node, comment) => comment.value.startsWith("!")
                            }
                        })
                    ] : []
            };
        }

        function getGenerateOptions(minify) {

            return {
                moduleId: "",
                moduleName: `${globalsName}.${camelCase(moduleName)}`,
                format: "umd",
                globals,
                banner: `/*!\n${pkg.name} ${pkg.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`,
                dest: minify ? `${moduleName}.umd.min.js` : `${moduleName}.umd.js`
            };
        }

        return gulp.src(path.join(entryRootPath, moduleName, "index.js"))
                   .pipe(gulpRollup(getOptions(false), getGenerateOptions(false)))
                   .pipe(gulp.dest(path.join(dest, moduleName, "bundles")))
                   .pipe(gulpRollup(getOptions(true), getGenerateOptions(true)))
                   .pipe(gulp.dest(path.join(dest, moduleName, "bundles")))
    }
};