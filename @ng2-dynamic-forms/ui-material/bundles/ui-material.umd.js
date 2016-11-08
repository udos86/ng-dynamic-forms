/*!
ng2-dynamic-forms 1.1.2 2016-11-08 15:46 UTC
Copyright (c) 2016, Udo Schöfer http://www.udos86.de

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/material'), require('@ng2-dynamic-forms/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/material', '@ng2-dynamic-forms/core', '@angular/common'], factory) :
    (factory((global.ng2DF = global.ng2DF || {}, global.ng2DF.uiMaterial = global.ng2DF.uiMaterial || {}),global.ng.core,global.ng.forms,global.ng.material,global.ng2DF.core,global.ng.common));
}(this, (function (exports,_angular_core,_angular_forms,_angular_material,_ng2DynamicForms_core,_angular_common) { 'use strict';

var __extends = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_UI_MATERIAL = "MATERIAL";
var DynamicFormMaterialComponent = (function (_super) {
    __extends(DynamicFormMaterialComponent, _super);
    function DynamicFormMaterialComponent() {
        _super.call(this);
        this.bindId = true;
        this.blur = new _angular_core.EventEmitter();
        this.change = new _angular_core.EventEmitter();
        this.focus = new _angular_core.EventEmitter();
        this.type = DYNAMIC_FORM_UI_MATERIAL;
    }
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormMaterialComponent.prototype, "bindId", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_forms.FormGroup)
    ], DynamicFormMaterialComponent.prototype, "controlGroup", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _ng2DynamicForms_core.DynamicFormControlModel)
    ], DynamicFormMaterialComponent.prototype, "model", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_core.TemplateRef)
    ], DynamicFormMaterialComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormMaterialComponent.prototype, "blur", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormMaterialComponent.prototype, "change", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormMaterialComponent.prototype, "focus", void 0);
    __decorate([
        _angular_core.ContentChild(_angular_core.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormMaterialComponent.prototype, "customTemplate", void 0);
    __decorate([
        _angular_core.ViewChild(_angular_material.MdCheckbox), 
        __metadata('design:type', _angular_material.MdCheckbox)
    ], DynamicFormMaterialComponent.prototype, "mdCheckbox", void 0);
    __decorate([
        _angular_core.ViewChild(_angular_material.MdInput), 
        __metadata('design:type', _angular_material.MdInput)
    ], DynamicFormMaterialComponent.prototype, "mdInput", void 0);
    __decorate([
        _angular_core.ViewChild(_angular_material.MdRadioGroup), 
        __metadata('design:type', _angular_material.MdRadioGroup)
    ], DynamicFormMaterialComponent.prototype, "mdRadioGroup", void 0);
    DynamicFormMaterialComponent = __decorate([
        _angular_core.Component({
            selector: "dynamic-form-material-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"model.cls.element.container\" [ngSwitch]=\"model.type\"><label *ngIf=\"!isCheckbox && !isSwitch && model.label\" [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label><fieldset *ngSwitchCase=\"'GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"[model.cls.element.control, model.cls.grid.control]\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><dynamic-form-material-control *ngFor=\"let controlModel of model.group\" [controlGroup]=\"control\" [model]=\"controlModel\" [nestedTemplate]=\"customTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-material-control></fieldset><div *ngSwitchCase=\"'ARRAY'\" [dynamicId]=\"bindId && model.id\" [formArrayName]=\"model.id\" [ngClass]=\"[model.cls.element.control, model.cls.grid.control]\"><fieldset *ngFor=\"let groupModel of model.groups; let idx = index\" [formGroupName]=\"idx\"><dynamic-form-material-control *ngFor=\"let controlModel of groupModel.group\" [bindId]=\"false\" [controlGroup]=\"control.at(idx)\" [model]=\"controlModel\" [nestedTemplate]=\"nestedTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-material-control><template [ngTemplateOutlet]=\"customTemplate || nestedTemplate\" [ngOutletContext]=\"groupModel\"></template></fieldset></div><md-checkbox *ngSwitchCase=\"'CHECKBOX'\" [align]=\"model.align\" [checked]=\"model.value\" [disabled]=\"model.disabled\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [indeterminate]=\"model.indeterminate\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"model.label\"></span></md-checkbox><fieldset *ngSwitchCase=\"'CHECKBOX_GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><md-checkbox *ngFor=\"let item of model.group\" [align]=\"item.align\" [checked]=\"item.value\" [disabled]=\"item.disabled\" [dynamicId]=\"bindId && item.id\" [formControlName]=\"item.id\" [indeterminate]=\"item.indeterminate\" [name]=\"item.name\" [ngClass]=\"item.cls.element.control\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"item.label\"></span></md-checkbox></fieldset><md-input *ngSwitchCase=\"'INPUT'\" [autocomplete]=\"model.autoComplete\" [autofocus]=\"model.autoFocus\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [hintLabel]=\"model.help\" [list]=\"model.listId\" [max]=\"model.max\" [maxlength]=\"model.maxLength\" [min]=\"model.min\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [pattern]=\"model.pattern\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [spellcheck]=\"model.spellCheck\" [step]=\"model.step\" [tabindex]=\"model.tabIndex\" [type]=\"model.inputType\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span *ngIf=\"model.prefix\" md-prefix [innerHTML]=\"model.prefix\"></span> <span *ngIf=\"model.suffix\" md-suffix [innerHTML]=\"model.suffix\"></span></md-input><md-radio-group *ngSwitchCase=\"'RADIO_GROUP'\" [disabled]=\"model.disabled\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><md-radio-button *ngFor=\"let option of model.options\" [name]=\"model.name\" [value]=\"option.value\"><span [innerHTML]=\"option.label\"></span></md-radio-button></md-radio-group><md-slide-toggle *ngSwitchCase=\"'SWITCH'\" [disabled]=\"model.disabled\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" (change)=\"onChange($event)\"><span [innerHTML]=\"model.label\"></span></md-slide-toggle><ng-content></ng-content></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormMaterialComponent);
    return DynamicFormMaterialComponent;
}(_ng2DynamicForms_core.DynamicFormControlComponent));

var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicFormsMaterialUIModule = (function () {
    function DynamicFormsMaterialUIModule() {
    }
    DynamicFormsMaterialUIModule = __decorate$1([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                _angular_forms.ReactiveFormsModule,
                _angular_material.MaterialModule,
                _ng2DynamicForms_core.DynamicFormsCoreModule
            ],
            declarations: [
                DynamicFormMaterialComponent
            ],
            exports: [
                _ng2DynamicForms_core.DynamicFormsCoreModule,
                DynamicFormMaterialComponent
            ]
        }), 
        __metadata$1('design:paramtypes', [])
    ], DynamicFormsMaterialUIModule);
    return DynamicFormsMaterialUIModule;
}());

exports.DYNAMIC_FORM_UI_MATERIAL = DYNAMIC_FORM_UI_MATERIAL;
exports.DynamicFormMaterialComponent = DynamicFormMaterialComponent;
exports.DynamicFormsMaterialUIModule = DynamicFormsMaterialUIModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
