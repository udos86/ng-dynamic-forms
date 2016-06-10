var karma = window.__karma__;

function isSpecFile(filePath) {
    return filePath.slice(-8) === ".spec.js";
}

function toImportPromise(module) {
    return System.import(module);
}

window.Error.stackTraceLimit = Infinity;
window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

karma.loaded = function () {};

System.config({

    baseURL: "./base/",

    map: {
        '@angular': 'node_modules/@angular',
        "@angular2-material": "node_modules/@angular2-material",
        "@ng2-dynamic-forms": "node_modules/@ng2-dynamic-forms",
        "modules": "modules",
        'rxjs': 'node_modules/rxjs'
    },

    packages: {
        '@angular/core': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/common': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/compiler': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/platform-browser': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular/platform-browser-dynamic': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        "@ng2-dynamic-forms/core": {
            main: "index.js",
            defaultExtension: "js"
        },
        "@ng2-dynamic-forms/ui-basic": {
            main: "index.js",
            defaultExtension: "js"
        },
        "@ng2-dynamic-forms/ui-bootstrap": {
            main: "index.js",
            defaultExtension: "js"
        },
        "@ng2-dynamic-forms/ui-material": {
            main: "index.js",
            defaultExtension: "js"
        },
        'modules': {
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        }
    }
});

Promise.all([

    System.import("@angular/core/testing"),
    System.import("@angular/platform-browser-dynamic/testing")

]).then(function (providers) {

    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
        testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

}).then(function () {

    return Promise.all(
        Object.keys(karma.files)
            .filter(isSpecFile)
            .map(toImportPromise)
    );

}).then(karma.start, karma.error);