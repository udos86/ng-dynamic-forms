Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};

System.config({

    baseURL: './base/',

    map: {
        '@angular': 'node_modules/@angular',
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
        'modules': {
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        }
    }
});

Promise.all([

    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')

]).then(function (providers) {

    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
        testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

}).then(function () {

    return Promise.all([

        System.import("modules/core/src/checkbox/dynamic-checkbox.model.spec"),
        System.import("modules/core/src/input/dynamic-text-input.model.spec"),
        System.import("modules/core/src/radio/dynamic-radio.model.spec"),
        System.import("modules/core/src/select/dynamic-select.model.spec"),
        System.import("modules/core/src/textarea/dynamic-textarea.model.spec")
    ]);

}).then(__karma__.start, __karma__.error);