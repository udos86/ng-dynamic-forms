(function (context) {

    var paths = {
        "npm:": "../node_modules/"
    };

    var map = {
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
        "@angular/http/testing": "npm:@angular/http/bundles/http-testing.umd.js",
        "@angular/material": "npm:@angular/material/material.umd.js",
        "@angular/router": "npm:@angular/router/bundles/router.umd.js",
        "@angular/router/testing": "npm:@angular/router/bundles/router-testing.umd.js",
        "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
        "@angular/forms/testing": "npm:@angular/forms/bundles/forms-testing.umd.js",
        "@ng2-dynamic-forms": "npm:@ng2-dynamic-forms",
        //"@ng2-dynamic-forms/core": "npm:@ng2-dynamic-forms/core/bundles/core.umd.min.js",
        //"@ng2-dynamic-forms/ui-basic": "npm:@ng2-dynamic-forms/ui-basic/bundles/ui-basic.umd.min.js",
        //"@ng2-dynamic-forms/ui-bootstrap": "npm:@ng2-dynamic-forms/ui-bootstrap/bundles/ui-bootstrap.umd.min.js",
        //"@ng2-dynamic-forms/ui-foundation": "npm:@ng2-dynamic-forms/ui-foundation/bundles/ui-foundation.umd.min.js",
        //"@ng2-dynamic-forms/ui-kendo": "npm:@ng2-dynamic-forms/ui-kendo/bundles/ui-kendo.umd.min.js",
        //"@ng2-dynamic-forms/ui-material": "npm:@ng2-dynamic-forms/ui-material/bundles/ui-material.umd.min.js",
        //"@ng2-dynamic-forms/ui-primeng": "npm:@ng2-dynamic-forms/ui-primeng/bundles/ui-primeng.umd.min.js",
        '@progress': 'npm:@progress',
        '@telerik': 'npm:@telerik',
        "app": "app",
        "primeng": "npm:primeng",
        "rxjs": "npm:rxjs"
    };

    var packages = {
        "app": {
            main: "main.js",
            defaultExtension: "js"
        },
        "@progress/kendo-angular-dropdowns": {
            defaultExtension: "js",
            main: "./dist/npm/js/main.js"
        },
        "@progress/kendo-angular-inputs": {
            defaultExtension: "js",
            main: "./dist/npm/js/main.js"
        },
        "@progress/kendo-angular-popup": {
            defaultExtension: "js",
            main: "./dist/npm/js/main.js"
        },
        "@progress/kendo-popup-common": {
            defaultExtension: "js",
            main: "./dist/npm/js/main.js"
        },
        "@telerik/kendo-inputs-common": {
            defaultExtension: "js",
            main: "./dist/npm/js/main.js"
        },
        "@telerik/kendo-draggable": {
            defaultExtension: "js",
            main: "./dist/npm/js/Draggable.js"
        },
        "@telerik/kendo-dropdowns-common": {
            defaultExtension: "js",
            main: "./dist/npm/js/main.js"
        },
        "rxjs": {
            defaultExtension: "js"
        },
        "primeng": {
            defaultExtension: "js"
        }
    };

    var ng2DynamicFormsPackageNames = [
        "@ng2-dynamic-forms/core",
        "@ng2-dynamic-forms/ui-basic",
        "@ng2-dynamic-forms/ui-bootstrap",
        "@ng2-dynamic-forms/ui-foundation",
        "@ng2-dynamic-forms/ui-kendo",
        "@ng2-dynamic-forms/ui-material",
        "@ng2-dynamic-forms/ui-primeng"
    ];

    ng2DynamicFormsPackageNames.forEach(function (packageName) {

        packages[packageName] = {
            main: "index.js",
            defaultExtension: "js"
        };
    });

    var config = {
        paths: paths,
        map: map,
        packages: packages
    };

    if (context.filterSystemConfig) {
        context.filterSystemConfig(config);
    }

    System.config(config);

})(window);