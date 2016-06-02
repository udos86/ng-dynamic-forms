(function (global) {

    // map tells the System loader where to look for things
    var map = {

        "example": "example", // 'dist',
        "rxjs": "node_modules/rxjs",
        "angular2-in-memory-web-api": "node_modules/angular2-in-memory-web-api",
        "@angular": "node_modules/@angular",
        "@angular2-material": "node_modules/@angular2-material"
    };

    // packages tells the System loader how to load when no filename and/or no extension is indicated
    var packages = {

        "example": {
            main: "main.js",
            defaultExtension: "js"
        },
        "app/shared": {
            main: "index.js",
            defaultExtension: "js"
        },
        "rxjs": {
            defaultExtension: "js"
        },
        "angular2-in-memory-web-api": {
            defaultExtension: "js"
        }
    };

    var angularPackageNames = [
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/http",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/router-deprecated",
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
        "core",
        "ui-basic",
        "ui-material"
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