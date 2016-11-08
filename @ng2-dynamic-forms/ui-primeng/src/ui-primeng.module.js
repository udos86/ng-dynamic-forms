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
var dynamic_form_primeng_component_1 = require("./dynamic-form-primeng.component");
var checkbox_1 = require("primeng/components/checkbox/checkbox");
var dropdown_1 = require("primeng/components/dropdown/dropdown");
var inputtext_1 = require("primeng/components/inputtext/inputtext");
var inputtextarea_1 = require("primeng/components/inputtextarea/inputtextarea");
var radiobutton_1 = require("primeng/components/radiobutton/radiobutton");
var spinner_1 = require("primeng/components/spinner/spinner");
var DynamicFormsPrimeNGUIModule = (function () {
    function DynamicFormsPrimeNGUIModule() {
    }
    DynamicFormsPrimeNGUIModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                core_2.DynamicFormsCoreModule,
                checkbox_1.CheckboxModule,
                dropdown_1.DropdownModule,
                inputtext_1.InputTextModule,
                inputtextarea_1.InputTextareaModule,
                radiobutton_1.RadioButtonModule,
                spinner_1.SpinnerModule
            ],
            declarations: [
                dynamic_form_primeng_component_1.DynamicFormPrimeNGComponent
            ],
            exports: [
                core_2.DynamicFormsCoreModule,
                dynamic_form_primeng_component_1.DynamicFormPrimeNGComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormsPrimeNGUIModule);
    return DynamicFormsPrimeNGUIModule;
}());
exports.DynamicFormsPrimeNGUIModule = DynamicFormsPrimeNGUIModule;

//# sourceMappingURL=ui-primeng.module.js.map
