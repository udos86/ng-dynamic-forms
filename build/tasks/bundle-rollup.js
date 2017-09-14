const dateFormat = require("dateformat"),
      fs         = require("fs"),
      path       = require("path"),
      gulp       = require("gulp"),
      gulpRollup = require('gulp-better-rollup'),
      uglify     = require("rollup-plugin-uglify"),
      merge      = require('merge-stream'),
      license    = fs.readFileSync("./LICENSE", "utf8");

module.exports = function (entryRootPath, moduleName, globalsName, pkg, dest) {

    function camelCase(string) {
        return string.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
    }

    return function () {

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

        const globals = {

            "@angular/common": "ng.common",
            "@angular/core": "ng.core",
            "@angular/forms": "ng.forms",
            "@angular/material": "ng.material",
            "@angular/http": "ng.http",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
            "@angular/router": "ng.router",
            "@ng-bootstrap/ng-bootstrap": "@ng-bootstrap/ng-bootstrap",
            "@ng-dynamic-forms/core": "ngDF.core",
            "@progress/kendo-angular-dateinputs": "progress/kendo-angular-dateinputs", // TODO
            "@progress/kendo-angular-dropdowns": "progress/kendo-angular-dropdowns", // TODO
            "@progress/kendo-angular-inputs": "progress/kendo-angular-inputs", // TODO
            "@progress/kendo-angular-upload": "progress/kendo-angular-upload", // TODO
            "angular2-text-mask": "angular2-text-mask", // TODO
            "ionic-angular": "ionic-angular",
            "ng-semantic": "ng-semantic", // TODO
            "primeng/primeng": "primeng/primeng",
            "rxjs/Subject": "Rx",
            "rxjs/Subscription": "Rx"
        };

        const srcPath = path.join(entryRootPath, moduleName, "public_api.js");

        const destPath = path.join(dest, moduleName, "bundles");

        const bundle = gulp.src(srcPath)
                           .pipe(gulpRollup(getOptions(false), getGenerateOptions(false)))
                           .pipe(gulp.dest(destPath));


        const bundleMinified = gulp.src(srcPath)
                                   .pipe(gulpRollup(getOptions(true), getGenerateOptions(true)))
                                   .pipe(gulp.dest(destPath));

        return merge(bundle, bundleMinified);
    }
};