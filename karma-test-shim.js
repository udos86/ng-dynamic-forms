var karma = window.__karma__;

function isSpecFile(filePath) {
    return filePath.startsWith("/base/modules/") && filePath.slice(-8) === ".spec.js";
}

function toImportPromise(module) {
    return System.import(module);
}

window.Error.stackTraceLimit = Infinity;
window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

karma.loaded = function () {
};

System.config({

    baseURL: "./base/",

    map: {
        '@angular': 'node_modules/@angular',
        "@angular2-material": "node_modules/@angular2-material",
        "@ng2-dynamic-forms": "node_modules/@ng2-dynamic-forms",
        "modules": "modules",
        "primeng": "node_modules/primeng",
        'rxjs': 'node_modules/rxjs',
        'symbol-observable': 'node_modules/symbol-observable'
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
        '@angular/forms': {
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
        '@angular/router': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        '@angular2-material/core': {
            main: 'core.js',
            defaultExtension: 'js'
        },
        '@angular2-material/checkbox': {
            main: 'checkbox.js',
            defaultExtension: 'js'
        },
        '@angular2-material/input': {
            main: 'input.js',
            defaultExtension: 'js'
        },
        '@angular2-material/radio': {
            main: 'radio.js',
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
        "@ng2-dynamic-forms/ui-foundation": {
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
        'primeng': {
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'symbol-observable': {
            main: "index.js",
            defaultExtension: 'js'
        }
    }
});

Promise.all([

    System.import("@angular/core/testing"),
    System.import("@angular/platform-browser-dynamic/testing")

]).then(function (providers) {

    var testingCore = providers[0];
    var testingBrowserDynamic = providers[1];

    testingCore.TestBed.initTestEnvironment(
        testingBrowserDynamic.BrowserDynamicTestingModule,
        testingBrowserDynamic.platformBrowserDynamicTesting()
    );

}).then(function () {

    return Promise.all(
        Object.keys(karma.files)
            .filter(isSpecFile)
            .map(toImportPromise)
    );

}).then(karma.start, karma.error);