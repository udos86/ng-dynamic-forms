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
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var core_2 = require("@ng2-dynamic-forms/core");
var dynamic_form_kendo_component_1 = require("./dynamic-form-kendo.component");
var DynamicFormsKendoUIModule = (function () {
    function DynamicFormsKendoUIModule() {
    }
    DynamicFormsKendoUIModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                kendo_angular_dropdowns_1.DropDownsModule,
                kendo_angular_inputs_1.InputsModule,
                core_2.DynamicFormsCoreModule
            ],
            declarations: [
                dynamic_form_kendo_component_1.DynamicFormKendoComponent
            ],
            exports: [
                core_2.DynamicFormsCoreModule,
                dynamic_form_kendo_component_1.DynamicFormKendoComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormsKendoUIModule);
    return DynamicFormsKendoUIModule;
}());
exports.DynamicFormsKendoUIModule = DynamicFormsKendoUIModule;

//# sourceMappingURL=ui-kendo.module.js.map
