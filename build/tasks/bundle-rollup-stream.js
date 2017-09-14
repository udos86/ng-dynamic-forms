const dateFormat = require("dateformat"),
      gulp       = require("gulp"),
      license    = require("fs").readFileSync("./LICENSE", "utf8"),
      merge      = require("merge-stream"),
      path       = require("path"),
      rollup     = require("rollup-stream"),
      source     = require("vinyl-source-stream"),
      uglify     = require("rollup-plugin-uglify");

module.exports = function (entryRootPath, moduleName, globalsName, pkg, dest) {

    const targets = [
        {
            format: "es",
            minify: false
        },
        {
            format: "umd",
            minify: false
        },
        {
            format: "umd",
            minify: true
        }
    ];

    const globals = {

        "@angular/animations": "ng.animations",
        "@angular/cdk": "ng.cdk",
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
        "ionic-angular": "ionic-angular", // TODO
        "primeng/primeng": "primeng/primeng",
        "rxjs/Observable": "Rx.Observable",
        "rxjs/Subject": "Rx.Subject",
        "rxjs/Subscription": "Rx.Subscription",
        "rxjs/add/observable/of": "rxjs/add/observable/of",
        "rxjs/add/operator/map": "rxjs/add/operator/map"
    };

    function toCamelCase(string) {
        return string.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
    }

    function rollupConfig(format, minify) {

        return {

            input: path.join(entryRootPath, moduleName, "public_api.js"),
            format: format,
            banner: `/*!\n${pkg.name} ${pkg.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`,
            context: "this",
            external: Object.keys(globals),
            name: `${globalsName}.${toCamelCase(moduleName)}`,
            globals,
            plugins: minify ? [uglify({output: {comments: (node, comment) => comment.value.startsWith("!")}})] : []
        };
    }

    return function () {

        const bundles = targets.map(target => {

            let bundleName = target.minify ? `${moduleName}.${target.format}.min.js` : `${moduleName}.${target.format}.js`,
                bundlePath = path.join(dest, moduleName, "bundles");

            return rollup(rollupConfig(target.format, target.minify))
                .pipe(source(bundleName))
                .pipe(gulp.dest(bundlePath));
        });

        return merge(...bundles);
    }
};