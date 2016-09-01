var karma = window.__karma__;

function isSpecFile(filePath) {
    return filePath.startsWith("/base/modules/") && filePath.slice(-8) === ".spec.js";
}

function toImportPromise(module) {
    return System.import(module);
}

window.Error.stackTraceLimit = Infinity;
window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

karma.loaded = function () {};

System.config({

    baseURL: "./base/",

    paths: {
        'npm:': 'node_modules/'
    },

    map: {
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
        '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',
        "@angular2-material": "npm:@angular2-material",
        "@ng2-dynamic-forms": "npm:@ng2-dynamic-forms",
        "angular2-in-memory-web-api": "npm:angular2-in-memory-web-api",
        "primeng": "npm:primeng",
        "rxjs": "npm:rxjs"
    },

    packages: {
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