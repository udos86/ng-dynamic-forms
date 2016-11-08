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
exports.DYNAMIC_FORM_UI_PRIME_NG = "PRIME_NG";
var DynamicFormPrimeNGComponent = (function (_super) {
    __extends(DynamicFormPrimeNGComponent, _super);
    function DynamicFormPrimeNGComponent() {
        _super.call(this);
        this.bindId = true;
        this.blur = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.type = exports.DYNAMIC_FORM_UI_PRIME_NG;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormPrimeNGComponent.prototype, "bindId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], DynamicFormPrimeNGComponent.prototype, "controlGroup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_2.DynamicFormControlModel)
    ], DynamicFormPrimeNGComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], DynamicFormPrimeNGComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormPrimeNGComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormPrimeNGComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormPrimeNGComponent.prototype, "focus", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormPrimeNGComponent.prototype, "customTemplate", void 0);
    DynamicFormPrimeNGComponent = __decorate([
        core_1.Component({
            selector: "dynamic-form-primeng-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"model.cls.element.container\" [ngSwitch]=\"model.type\"><fieldset *ngSwitchCase=\"'CHECKBOX_GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><div *ngFor=\"let item of model.group\" [ngClass]=\"item.cls.grid.container\"><div [ngClass]=\"item.cls.grid.control\"><p-checkbox binary=\"true\" [dynamicId]=\"bindId && item.id\" [formControlName]=\"item.id\" [name]=\"model.name\" [value]=\"item.value\" [ngClass]=\"item.cls.element.control\"></p-checkbox></div><div [ngClass]=\"item.cls.grid.label\"><label [attr.for]=\"item.id\" [innerHTML]=\"item.label\" [ngClass]=\"item.cls.element.label\"></label></div></div></fieldset><fieldset *ngSwitchCase=\"'RADIO_GROUP'\" role=\"radiogroup\" [attr.tabindex]=\"model.tabIndex\" [dynamicId]=\"bindId && model.id\" [name]=\"model.name\" (change)=\"onChange($event)\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><div *ngFor=\"let option of model.options\" [ngClass]=\"model.cls.grid.container\"><div [ngClass]=\"model.cls.grid.control\"><p-radioButton [formControlName]=\"model.id\" [name]=\"model.name\" [(ngModel)]=\"model.value\" [value]=\"option.value\"></p-radioButton></div><div [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [innerHTML]=\"option.label\" [ngClass]=\"model.cls.element.label\"></label></div></div></fieldset><div *ngIf=\"!isRadioGroup && !isCheckboxGroup\" [ngClass]=\"model.cls.grid.container\"><div *ngIf=\"!isCheckbox && model.label\" [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label></div><div [ngClass]=\"model.cls.grid.control\"><fieldset *ngSwitchCase=\"'GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><dynamic-form-primeng-control *ngFor=\"let controlModel of model.group\" [controlGroup]=\"control\" [model]=\"controlModel\" [nestedTemplate]=\"customTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-primeng-control></fieldset><div *ngSwitchCase=\"'ARRAY'\" [dynamicId]=\"bindId && model.id\" [formArrayName]=\"model.id\" [ngClass]=\"model.cls.element.control\"><fieldset *ngFor=\"let groupModel of model.groups; let idx = index\" [formGroupName]=\"idx\"><dynamic-form-primeng-control *ngFor=\"let controlModel of groupModel.group\" [bindId]=\"false\" [controlGroup]=\"control.at(idx)\" [model]=\"controlModel\" [nestedTemplate]=\"nestedTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-primeng-control><template [ngTemplateOutlet]=\"customTemplate || nestedTemplate\" [ngOutletContext]=\"groupModel\"></template></fieldset></div><input *ngSwitchCase=\"'INPUT'\" pInputText [attr.accept]=\"model.accept\" [attr.autoComplete]=\"model.autoComplete\" [attr.list]=\"model.listId\" [attr.max]=\"model.max\" [attr.min]=\"model.min\" [attr.multiple]=\"model.multiple\" [attr.step]=\"model.step\" [attr.tabindex]=\"model.tabIndex\" [autofocus]=\"model.autoFocus\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [maxlength]=\"model.maxLength\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [pattern]=\"model.pattern\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [spellcheck]=\"model.spellCheck\" [type]=\"model.inputType\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><datalist *ngIf=\"model.list\" [id]=\"model.listId\"><option *ngFor=\"let option of model.list\" [value]=\"option\"></option></datalist><p-checkbox *ngSwitchCase=\"'CHECKBOX'\" binary=\"true\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [value]=\"model.value\"></p-checkbox><p-dropdown *ngSwitchCase=\"'SELECT'\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [options]=\"model.options\"></p-dropdown><textarea *ngSwitchCase=\"'TEXTAREA'\" pInputTextarea [attr.tabindex]=\"model.tabIndex\" [cols]=\"model.cols\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [maxlength]=\"model.maxLength\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [rows]=\"model.rows\" [spellcheck]=\"model.spellCheck\" [wrap]=\"model.wrap\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></textarea></div><div *ngIf=\"isCheckbox\" [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label></div></div></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormPrimeNGComponent);
    return DynamicFormPrimeNGComponent;
}(core_2.DynamicFormControlComponent));
exports.DynamicFormPrimeNGComponent = DynamicFormPrimeNGComponent;

//# sourceMappingURL=dynamic-form-primeng.component.js.map
