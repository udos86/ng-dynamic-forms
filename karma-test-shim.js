let karma = window.__karma__;

function isSpecFile(filePath) {
    return filePath.startsWith("/base/@ng2-dynamic-forms/") && filePath.slice(-8) === ".spec.js";
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
        "npm:": "node_modules/"
    },

    map: {
        "@angular/core": "npm:@angular/core/bundles/core.umd.js",
        "@angular/core/testing": "npm:@angular/core/bundles/core-testing.umd.js",
        "@angular/common": "npm:@angular/common/bundles/common.umd.js",
        "@angular/common/testing": "npm:@angular/common/bundles/common-testing.umd.js",
        "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
        "@angular/compiler/testing": "npm:@angular/compiler/bundles/compiler-testing.umd.js",
        "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
        "@angular/platform-browser/testing": "npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js",
        "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
        "@angular/platform-browser-dynamic/testing": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js",
        "@angular/http": "npm:@angular/http/bundles/http.umd.js",
        "@angular/material": "npm:@angular/material/material.umd.js",
        "@angular/http/testing": "npm:@angular/http/bundles/http-testing.umd.js",
        "@angular/router": "npm:@angular/router/bundles/router.umd.js",
        "@angular/router/testing": "npm:@angular/router/bundles/router-testing.umd.js",
        "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
        "@angular/forms/testing": "npm:@angular/forms/bundles/forms-testing.umd.js",
        "@ng2-dynamic-forms/core": "npm:@ng2-dynamic-forms/core/bundles/core.umd.js",
        "@ng2-dynamic-forms/ui-basic": "npm:@ng2-dynamic-forms/ui-basic/bundles/ui-basic.umd.js",
        "@ng2-dynamic-forms/ui-bootstrap": "npm:@ng2-dynamic-forms/ui-bootstrap/bundles/ui-bootstrap.umd.js",
        "@ng2-dynamic-forms/ui-foundation": "npm:@ng2-dynamic-forms/ui-foundation/bundles/ui-foundation.umd.js",
        "@ng2-dynamic-forms/ui-material": "npm:@ng2-dynamic-forms/ui-material/bundles/ui-material.umd.js",
        "@ng2-dynamic-forms/ui-primeng": "npm:@ng2-dynamic-forms/ui-primeng/bundles/ui-primeng.umd.js",
        "primeng": "npm:primeng",
        "rxjs": "npm:rxjs"
    },

    packages: {
        "@ng2-dynamic-forms": {
            defaultExtension: "js"
        },
        "primeng": {
            defaultExtension: "js"
        },
        "rxjs": {
            defaultExtension: "js"
        }
    }
});

Promise.all([

    System.import("@angular/core/testing"),
    System.import("@angular/platform-browser-dynamic/testing")

]).then(function (providers) {

    let testingCore = providers[0];
    let testingBrowserDynamic = providers[1];

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