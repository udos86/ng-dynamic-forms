"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var forms_1 = require("@angular/forms");
var core_2 = require("@ng2-dynamic-forms/core");
exports.DYNAMIC_FORM_UI_KENDO = "KENDO";
var DynamicFormKendoComponent = (function (_super) {
    __extends(DynamicFormKendoComponent, _super);
    function DynamicFormKendoComponent() {
        _super.call(this);
        this.bindId = true;
        this.blur = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.type = exports.DYNAMIC_FORM_UI_KENDO;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormKendoComponent.prototype, "bindId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], DynamicFormKendoComponent.prototype, "controlGroup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_2.DynamicFormControlModel)
    ], DynamicFormKendoComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], DynamicFormKendoComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormKendoComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormKendoComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormKendoComponent.prototype, "focus", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormKendoComponent.prototype, "customTemplate", void 0);
    DynamicFormKendoComponent = __decorate([
        core_1.Component({
            selector: "dynamic-form-kendo-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"[model.cls.element.container, model.cls.grid.container]\" [ngSwitch]=\"model.type\"><label [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"[model.cls.element.label, model.cls.grid.label]\"></label><kendo-dropdownlist *ngSwitchCase=\"'SELECT'\" [data]=\"model.options\" [formControlName]=\"model.id\" [textField]=\"'label'\" [valueField]=\"'value'\"></kendo-dropdownlist><ng-content></ng-content></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormKendoComponent);
    return DynamicFormKendoComponent;
}(core_2.DynamicFormControlComponent));
exports.DynamicFormKendoComponent = DynamicFormKendoComponent;

//# sourceMappingURL=dynamic-form-kendo.component.js.map
