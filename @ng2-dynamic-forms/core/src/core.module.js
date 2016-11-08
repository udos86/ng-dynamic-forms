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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_form_service_1 = require("./service/dynamic-form.service");
var dynamic_form_autofill_service_1 = require("./service/dynamic-form-autofill.service");
var dynamic_id_directive_1 = require("./directive/dynamic-id.directive");
var DynamicFormsCoreModule = (function () {
    function DynamicFormsCoreModule(parentModule) {
        if (parentModule) {
            throw new Error("DynamicFormsCoreModule should only be imported in the root NgModule of the application!");
        }
    }
    DynamicFormsCoreModule.forRoot = function () {
        return {
            ngModule: DynamicFormsCoreModule,
            providers: [dynamic_form_service_1.DynamicFormService, dynamic_form_autofill_service_1.DynamicFormAutoFillService]
        };
    };
    DynamicFormsCoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [dynamic_id_directive_1.DynamicIdDirective],
            exports: [dynamic_id_directive_1.DynamicIdDirective]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [DynamicFormsCoreModule])
    ], DynamicFormsCoreModule);
    return DynamicFormsCoreModule;
}());
exports.DynamicFormsCoreModule = DynamicFormsCoreModule;

//# sourceMappingURL=core.module.js.map
