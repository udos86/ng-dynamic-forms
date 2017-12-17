const alias           = require("rollup-plugin-alias"),
      resolve         = require("rollup-plugin-node-resolve"),
      sourcemaps      = require("rollup-plugin-sourcemaps"),
      uglify          = require("rollup-plugin-uglify"),
      dateFormat      = require("dateformat"),
      license         = require("fs").readFileSync("./LICENSE", "utf8"),
      rxjsPathMapping = require("rxjs/_esm5/path-mapping")();

const utils = {

    hasMinifyFlag: argv => {
        return !!argv.includes("--minify");
    },

    getBanner: packageJson => {
        return `/*!\n${packageJson.name} ${packageJson.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`;
    },

    getRollupInputPath: packageJson => {

        let pkgNameSplit = packageJson.name.split("/");

        return `./dist/${packageJson.name}/src/${pkgNameSplit[pkgNameSplit.length - 1]}.js`;
    },

    getRollupOutputPath: (packageJson, format, minify) => {

        let pkgNameSplit  = packageJson.name.split("/"),
            bundleFolder  = format === "umd" ? "bundles" : "@ng-dynamic-forms",
            fileExtension = minify ? "min." : "";

        return `./dist/${packageJson.name}/${bundleFolder}/${pkgNameSplit[pkgNameSplit.length - 1]}.${format}.${fileExtension}js`;
    },

    getRollupPlugins: minify => {

        const plugins = [alias(rxjsPathMapping), resolve(), sourcemaps()];

        if (minify) {
            plugins.push(uglify({output: {comments: (node, comment) => comment.value.startsWith("!")}}));
        }

        return plugins;
    },

    getRollupFormat: argv => {
        return argv[argv.indexOf("-f") + 1];
    },

    getRollupGlobals: () => {

        return {
            "@angular/animations": "ng.animations",
            "@angular/common": "ng.common",
            "@angular/core": "ng.core",
            "@angular/forms": "ng.forms",
            "@angular/material": "ng.material",
            "@angular/http": "ng.http",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
            "@angular/router": "ng.router",
            "@ng-bootstrap/ng-bootstrap": "@ng-bootstrap/ng-bootstrap",
            "@ng-bootstrap/ng-bootstrap/index": "@ng-bootstrap/ng-bootstrap",
            "@ng-dynamic-forms/core": "ngDF.core",
            "@progress/kendo-angular-dateinputs": "progress/kendo-angular-dateinputs",
            "@progress/kendo-angular-dropdowns": "progress/kendo-angular-dropdowns",
            "@progress/kendo-angular-inputs": "progress/kendo-angular-inputs",
            "@progress/kendo-angular-upload": "progress/kendo-angular-upload",
            "angular2-text-mask": "angular2-text-mask",
            "ionic-angular": "ionic-angular",
            "ionic-angular/index": "ionic-angular",
            "primeng/primeng": "primeng/primeng",
            "rxjs/BehaviorSubject": "Rx.BehaviorSubject",
            "rxjs/Observable": "Rx.Observable",
            "rxjs/Subject": "Rx.Subject",
            "rxjs/Subscription": "Rx.Subscription",
            "rxjs/add/observable/of": "rxjs/add/observable/of",
            "rxjs/add/operator/map": "rxjs/add/operator/map",
            "rxjs/operator/map": "rxjs/operator/map",
            "rxjs/operator/distinctUntilChanged": "rxjs/operator/distinctUntilChanged",
            "rxjs/operator/observeOn": "rxjs/operator/observeOn",
            "rxjs/operator/scan": "rxjs/operator/scan",
            "rxjs/scheduler/queue": "rxjs/scheduler/queue"
        };
    }
};

module.exports = utils;
