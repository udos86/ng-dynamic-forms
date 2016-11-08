"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_2 = require("@ng2-dynamic-forms/core");
var dynamic_form_foundation_sites_component_1 = require("./dynamic-form-foundation-sites.component");
var DynamicFormsFoundationUIModule = (function () {
    function DynamicFormsFoundationUIModule() {
    }
    DynamicFormsFoundationUIModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                core_2.DynamicFormsCoreModule
            ],
            declarations: [
                dynamic_form_foundation_sites_component_1.DynamicFormFoundationSitesComponent
            ],
            exports: [
                core_2.DynamicFormsCoreModule,
                dynamic_form_foundation_sites_component_1.DynamicFormFoundationSitesComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormsFoundationUIModule);
    return DynamicFormsFoundationUIModule;
}());
exports.DynamicFormsFoundationUIModule = DynamicFormsFoundationUIModule;

//# sourceMappingURL=ui-foundation.module.js.map
