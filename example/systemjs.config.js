(function (context) {

    var paths = {
        "npm:": "../node_modules/"
    };

    var map = {
        "@angular/animations": "npm:@angular/animations/bundles/animations.umd.js",
        "@angular/animations/browser": "npm:@angular/animations/bundles/animations-browser.umd.js",
        "@angular/animations/testing": "npm:@angular/animations/bundles/animations-browser-testing.umd.js",
        "@angular/common": "npm:@angular/common/bundles/common.umd.js",
        "@angular/common/testing": "npm:@angular/common/bundles/common-testing.umd.js",
        "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
        "@angular/compiler/testing": "npm:@angular/compiler/bundles/compiler-testing.umd.js",
        "@angular/core": "npm:@angular/core/bundles/core.umd.js",
        "@angular/core/testing": "npm:@angular/core/bundles/core-testing.umd.js",
        "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
        "@angular/forms/testing": "npm:@angular/forms/bundles/forms-testing.umd.js",
        "@angular/http": "npm:@angular/http/bundles/http.umd.js",
        "@angular/http/testing": "npm:@angular/http/bundles/http-testing.umd.js",
        "@angular/material": "npm:@angular/material/bundles/material.umd.js",
        "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
        "@angular/platform-browser/animations": "npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js",
        "@angular/platform-browser/testing": "npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js",
        "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
        "@angular/platform-browser-dynamic/testing": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js",
        "@angular/router": "npm:@angular/router/bundles/router.umd.js",
        "@angular/router/testing": "npm:@angular/router/bundles/router-testing.umd.js",
        "@ng-bootstrap/ng-bootstrap": "npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js",
        //"@ng2-dynamic-forms": "npm:@ng2-dynamic-forms",
        "@ng2-dynamic-forms/core": "npm:@ng2-dynamic-forms/core/bundles/core.umd.js",
        "@ng2-dynamic-forms/ui-basic": "npm:@ng2-dynamic-forms/ui-basic/bundles/ui-basic.umd.js",
        "@ng2-dynamic-forms/ui-bootstrap": "npm:@ng2-dynamic-forms/ui-bootstrap/bundles/ui-bootstrap.umd.js",
        "@ng2-dynamic-forms/ui-foundation": "npm:@ng2-dynamic-forms/ui-foundation/bundles/ui-foundation.umd.js",
        "@ng2-dynamic-forms/ui-kendo": "npm:@ng2-dynamic-forms/ui-kendo/bundles/ui-kendo.umd.js",
        "@ng2-dynamic-forms/ui-material": "npm:@ng2-dynamic-forms/ui-material/bundles/ui-material.umd.js",
        "@ng2-dynamic-forms/ui-ng-bootstrap": "npm:@ng2-dynamic-forms/ui-ng-bootstrap/bundles/ui-ng-bootstrap.umd.js",
        "@ng2-dynamic-forms/ui-primeng": "npm:@ng2-dynamic-forms/ui-primeng/bundles/ui-primeng.umd.js",
        "@progress": "npm:@progress",
        "@progress/kendo-angular-dateinputs": "npm:@progress/kendo-angular-dateinputs/dist/npm/main.js",
        "@progress/kendo-angular-dropdowns": "npm:@progress/kendo-angular-dropdowns/dist/npm/main.js",
        "@progress/kendo-angular-inputs": "npm:@progress/kendo-angular-inputs/dist/npm/main.js",
        "@progress/kendo-angular-intl": "npm:@progress/kendo-angular-intl/dist/npm/main.js",
        "@progress/kendo-angular-l10n": "npm:@progress/kendo-angular-l10n/dist/npm/main.js",
        "@progress/kendo-angular-popup": "npm:@progress/kendo-angular-popup/dist/npm/main.js",
        "@progress/kendo-angular-resize-sensor": "npm:@progress/kendo-angular-resize-sensor/dist/npm/main.js",
        "@progress/kendo-angular-upload": "npm:@progress/kendo-angular-upload/dist/npm/main.js",
        "@progress/kendo-date-math": "npm:@progress/kendo-date-math/dist/npm/main.js",
        "@progress/kendo-popup-common": "npm:@progress/kendo-popup-common/dist/npm/main.js",
        "@telerik": "npm:@telerik",
        "@telerik/kendo-draggable": "npm:@telerik/kendo-draggable/dist/npm/main.js",
        "@telerik/kendo-dropdowns-common": "npm:@telerik/kendo-dropdowns-common/dist/npm/main.js",
        "@telerik/kendo-inputs-common": "npm:@telerik/kendo-inputs-common/dist/npm/main.js",
        "@telerik/kendo-intl": "npm:@telerik/kendo-intl/dist/npm/main.js",
        "angular2-text-mask": "npm:angular2-text-mask/dist/angular2TextMask.js",
        "app": "app",
        "ionic-angular": "npm:ionic-angular/bundles/ionic.umd.js",
        "primeng": "npm:primeng",
        "rxjs": "npm:rxjs",
        "text-mask-core": "npm:text-mask-core",
    };

    var packages = {
        "app": {
            main: "main.jit.js",
            defaultExtension: "js"
        },
        "@progress": {
            defaultExtension: "js"
        },
        "@telerik": {
            defaultExtension: "js"
        },
        "ng-semantic": {
            main: "ng-semantic.js",
            defaultExtension: "js"
        },
        "primeng": {
            defaultExtension: "js"
        },
        "rxjs": {
            main: "Rx.js",
            defaultExtension: "js"
        },
        "text-mask-core": {
            defaultExtension: "js"
        }
    };
    /*
    var ng2DynamicFormsPackageNames = [
        "@ng2-dynamic-forms/core",
        "@ng2-dynamic-forms/ui-basic",
        "@ng2-dynamic-forms/ui-bootstrap",
        "@ng2-dynamic-forms/ui-foundation",
        "@ng2-dynamic-forms/ui-kendo",
        "@ng2-dynamic-forms/ui-material",
        "@ng2-dynamic-forms/ui-ng-bootstrap",
        "@ng2-dynamic-forms/ui-primeng"
    ];

    ng2DynamicFormsPackageNames.forEach(function (packageName) {

        packages[packageName] = {
            main: "index.js",
            defaultExtension: "js"
        };
    });
    */

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