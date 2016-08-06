(function (global) {

    // map tells the System loader where to look for things
    var map = {

        "app": "app", 
        "rxjs": "node_modules/rxjs",
        "angular2-in-memory-web-api": "node_modules/angular2-in-memory-web-api",
        "@angular": "node_modules/@angular",
        "@angular2-material": "node_modules/@angular2-material",
        "@ng2-dynamic-forms": "node_modules/@ng2-dynamic-forms",
        "primeng": "node_modules/primeng",
        "symbol-observable": "node_modules/symbol-observable"
    };

    // packages tells the System loader how to load when no filename and/or no extension is indicated
    var packages = {

        "angular2-in-memory-web-api": {
            defaultExtension: "js"
        },
        "app": {
            main: "main.js",
            defaultExtension: "js"
        },
        "rxjs": {
            defaultExtension: "js"
        },
        "primeng": {
            defaultExtension: "js"
        },
        "symbol-observable": {
            main: "index.js",
            defaultExtension: "js"
        }
    };

    var angularPackageNames = [
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/forms",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/router",
        "@angular/testing",
        "@angular/upgrade"
    ];

    var angularMaterialPackageNames = [
        "button",
        "checkbox",
        "core",
        "input",
        "radio"
    ];

    var ng2DynamicFormsPackageNames = [
        "@ng2-dynamic-forms/core",
        "@ng2-dynamic-forms/ui-basic",
        "@ng2-dynamic-forms/ui-bootstrap",
        "@ng2-dynamic-forms/ui-foundation",
        "@ng2-dynamic-forms/ui-material",
        "@ng2-dynamic-forms/ui-primeng"
    ];

    angularPackageNames.forEach(function (packageName) {

        packages[packageName] = {
            main: "index.js",
            defaultExtension: "js"
        };
    });

    angularMaterialPackageNames.forEach(function (packageName) {

        packages["@angular2-material/" +packageName] = {
            format: "cjs",
            main: packageName +".js",
            defaultExtension: "js"
        };
    });

    ng2DynamicFormsPackageNames.forEach(function (packageName) {

        packages[packageName] = {
            main: "index.js",
            defaultExtension: "js"
        };
    });

    var config = {

        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);