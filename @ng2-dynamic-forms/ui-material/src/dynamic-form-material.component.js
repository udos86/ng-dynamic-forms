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
var material_1 = require("@angular/material");
var core_2 = require("@ng2-dynamic-forms/core");
var core_3 = require("@ng2-dynamic-forms/core");
exports.DYNAMIC_FORM_UI_MATERIAL = "MATERIAL";
var DynamicFormMaterialComponent = (function (_super) {
    __extends(DynamicFormMaterialComponent, _super);
    function DynamicFormMaterialComponent() {
        _super.call(this);
        this.bindId = true;
        this.blur = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.type = exports.DYNAMIC_FORM_UI_MATERIAL;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormMaterialComponent.prototype, "bindId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', forms_1.FormGroup)
    ], DynamicFormMaterialComponent.prototype, "controlGroup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_2.DynamicFormControlModel)
    ], DynamicFormMaterialComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], DynamicFormMaterialComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormMaterialComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormMaterialComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DynamicFormMaterialComponent.prototype, "focus", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormMaterialComponent.prototype, "customTemplate", void 0);
    __decorate([
        core_1.ViewChild(material_1.MdCheckbox), 
        __metadata('design:type', material_1.MdCheckbox)
    ], DynamicFormMaterialComponent.prototype, "mdCheckbox", void 0);
    __decorate([
        core_1.ViewChild(material_1.MdInput), 
        __metadata('design:type', material_1.MdInput)
    ], DynamicFormMaterialComponent.prototype, "mdInput", void 0);
    __decorate([
        core_1.ViewChild(material_1.MdRadioGroup), 
        __metadata('design:type', material_1.MdRadioGroup)
    ], DynamicFormMaterialComponent.prototype, "mdRadioGroup", void 0);
    DynamicFormMaterialComponent = __decorate([
        core_1.Component({
            selector: "dynamic-form-material-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"model.cls.element.container\" [ngSwitch]=\"model.type\"><label *ngIf=\"!isCheckbox && !isSwitch && model.label\" [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label><fieldset *ngSwitchCase=\"'GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"[model.cls.element.control, model.cls.grid.control]\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><dynamic-form-material-control *ngFor=\"let controlModel of model.group\" [controlGroup]=\"control\" [model]=\"controlModel\" [nestedTemplate]=\"customTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-material-control></fieldset><div *ngSwitchCase=\"'ARRAY'\" [dynamicId]=\"bindId && model.id\" [formArrayName]=\"model.id\" [ngClass]=\"[model.cls.element.control, model.cls.grid.control]\"><fieldset *ngFor=\"let groupModel of model.groups; let idx = index\" [formGroupName]=\"idx\"><dynamic-form-material-control *ngFor=\"let controlModel of groupModel.group\" [bindId]=\"false\" [controlGroup]=\"control.at(idx)\" [model]=\"controlModel\" [nestedTemplate]=\"nestedTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-material-control><template [ngTemplateOutlet]=\"customTemplate || nestedTemplate\" [ngOutletContext]=\"groupModel\"></template></fieldset></div><md-checkbox *ngSwitchCase=\"'CHECKBOX'\" [align]=\"model.align\" [checked]=\"model.value\" [disabled]=\"model.disabled\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [indeterminate]=\"model.indeterminate\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"model.label\"></span></md-checkbox><fieldset *ngSwitchCase=\"'CHECKBOX_GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><md-checkbox *ngFor=\"let item of model.group\" [align]=\"item.align\" [checked]=\"item.value\" [disabled]=\"item.disabled\" [dynamicId]=\"bindId && item.id\" [formControlName]=\"item.id\" [indeterminate]=\"item.indeterminate\" [name]=\"item.name\" [ngClass]=\"item.cls.element.control\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"item.label\"></span></md-checkbox></fieldset><md-input *ngSwitchCase=\"'INPUT'\" [autocomplete]=\"model.autoComplete\" [autofocus]=\"model.autoFocus\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [hintLabel]=\"model.help\" [list]=\"model.listId\" [max]=\"model.max\" [maxlength]=\"model.maxLength\" [min]=\"model.min\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [pattern]=\"model.pattern\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [spellcheck]=\"model.spellCheck\" [step]=\"model.step\" [tabindex]=\"model.tabIndex\" [type]=\"model.inputType\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span *ngIf=\"model.prefix\" md-prefix [innerHTML]=\"model.prefix\"></span> <span *ngIf=\"model.suffix\" md-suffix [innerHTML]=\"model.suffix\"></span></md-input><md-radio-group *ngSwitchCase=\"'RADIO_GROUP'\" [disabled]=\"model.disabled\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><md-radio-button *ngFor=\"let option of model.options\" [name]=\"model.name\" [value]=\"option.value\"><span [innerHTML]=\"option.label\"></span></md-radio-button></md-radio-group><md-slide-toggle *ngSwitchCase=\"'SWITCH'\" [disabled]=\"model.disabled\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" (change)=\"onChange($event)\"><span [innerHTML]=\"model.label\"></span></md-slide-toggle><ng-content></ng-content></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormMaterialComponent);
    return DynamicFormMaterialComponent;
}(core_3.DynamicFormControlComponent));
exports.DynamicFormMaterialComponent = DynamicFormMaterialComponent;

//# sourceMappingURL=dynamic-form-material.component.js.map
