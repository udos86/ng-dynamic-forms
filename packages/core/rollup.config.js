import resolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import uglify from "rollup-plugin-uglify";

const dateFormat = require("dateformat");
const license = require("fs").readFileSync("./LICENSE", "utf8");
const pkg = require("./package.json");

const format = process.argv[process.argv.indexOf("-f") + 1];
const minify = !!process.argv.includes("--minify");

const globals = {

    "@angular/animations": "ng.animations",
    "@angular/cdk": "ng.cdk",
    "@angular/common": "ng.common",
    "@angular/core": "ng.core",
    "@angular/forms": "ng.forms",
    "@angular/http": "ng.http",
    "@angular/platform-browser": "ng.platformBrowser",
    "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
    "@angular/router": "ng.router",
    "rxjs/Observable": "Rx.Observable",
    "rxjs/Subject": "Rx.Subject",
    "rxjs/Subscription": "Rx.Subscription",
    "rxjs/add/observable/of": "rxjs/add/observable/of",
    "rxjs/add/operator/map": "rxjs/add/operator/map"
};

const plugins = [resolve(), sourcemaps()];

if (minify) {
    plugins.push(uglify({output: {comments: (node, comment) => comment.value.startsWith("!")}}));
}

export default {
    input: "./dist/@ng-dynamic-forms/core/public_api.js",
    output: {
        file: `./dist/@ng-dynamic-forms/core/bundles/core.${format}.${minify ? "min." : ""}js`,
        format: format
    },
    exports: "named",
    name: "ngDF.core",
    context: "this",
    banner: `/*!\n${pkg.name} ${pkg.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`,
    plugins: plugins,
    globals: globals,
    external: Object.keys(globals),
    sourcemap: true
};