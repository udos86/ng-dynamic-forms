/*!
ng2-dynamic-forms 1.1.2 2016-11-08 16:09 UTC
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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ng2-dynamic-forms/core'), require('@angular/common'), require('primeng/components/checkbox/checkbox'), require('primeng/components/dropdown/dropdown'), require('primeng/components/inputtext/inputtext'), require('primeng/components/inputtextarea/inputtextarea'), require('primeng/components/radiobutton/radiobutton'), require('primeng/components/spinner/spinner')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@ng2-dynamic-forms/core', '@angular/common', 'primeng/components/checkbox/checkbox', 'primeng/components/dropdown/dropdown', 'primeng/components/inputtext/inputtext', 'primeng/components/inputtextarea/inputtextarea', 'primeng/components/radiobutton/radiobutton', 'primeng/components/spinner/spinner'], factory) :
    (factory((global.ng2DF = global.ng2DF || {}, global.ng2DF.uiPrimeng = global.ng2DF.uiPrimeng || {}),global.ng.core,global.ng.forms,global.ng2DF.core,global.ng.common,global.primeng/components/checkbox/checkbox,global.primeng/components/dropdown/dropdown,global.primeng/components/inputtext/inputtext,global.primeng/components/inputtextarea/inputtextarea,global.primeng/components/radiobutton/radiobutton,global.primeng/components/spinner/spinner));
}(this, (function (exports,_angular_core,_angular_forms,_ng2DynamicForms_core,_angular_common,primeng_components_checkbox_checkbox,primeng_components_dropdown_dropdown,primeng_components_inputtext_inputtext,primeng_components_inputtextarea_inputtextarea,primeng_components_radiobutton_radiobutton,primeng_components_spinner_spinner) { 'use strict';

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
var DYNAMIC_FORM_UI_PRIME_NG = "PRIME_NG";
var DynamicFormPrimeNGComponent = (function (_super) {
    __extends(DynamicFormPrimeNGComponent, _super);
    function DynamicFormPrimeNGComponent() {
        _super.call(this);
        this.bindId = true;
        this.blur = new _angular_core.EventEmitter();
        this.change = new _angular_core.EventEmitter();
        this.focus = new _angular_core.EventEmitter();
        this.type = DYNAMIC_FORM_UI_PRIME_NG;
    }
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormPrimeNGComponent.prototype, "bindId", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_forms.FormGroup)
    ], DynamicFormPrimeNGComponent.prototype, "controlGroup", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _ng2DynamicForms_core.DynamicFormControlModel)
    ], DynamicFormPrimeNGComponent.prototype, "model", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_core.TemplateRef)
    ], DynamicFormPrimeNGComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormPrimeNGComponent.prototype, "blur", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormPrimeNGComponent.prototype, "change", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormPrimeNGComponent.prototype, "focus", void 0);
    __decorate([
        _angular_core.ContentChild(_angular_core.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormPrimeNGComponent.prototype, "customTemplate", void 0);
    DynamicFormPrimeNGComponent = __decorate([
        _angular_core.Component({
            selector: "dynamic-form-primeng-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"model.cls.element.container\" [ngSwitch]=\"model.type\"><fieldset *ngSwitchCase=\"'CHECKBOX_GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><div *ngFor=\"let item of model.group\" [ngClass]=\"item.cls.grid.container\"><div [ngClass]=\"item.cls.grid.control\"><p-checkbox binary=\"true\" [dynamicId]=\"bindId && item.id\" [formControlName]=\"item.id\" [name]=\"model.name\" [value]=\"item.value\" [ngClass]=\"item.cls.element.control\"></p-checkbox></div><div [ngClass]=\"item.cls.grid.label\"><label [attr.for]=\"item.id\" [innerHTML]=\"item.label\" [ngClass]=\"item.cls.element.label\"></label></div></div></fieldset><fieldset *ngSwitchCase=\"'RADIO_GROUP'\" role=\"radiogroup\" [attr.tabindex]=\"model.tabIndex\" [dynamicId]=\"bindId && model.id\" [name]=\"model.name\" (change)=\"onChange($event)\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><div *ngFor=\"let option of model.options\" [ngClass]=\"model.cls.grid.container\"><div [ngClass]=\"model.cls.grid.control\"><p-radioButton [formControlName]=\"model.id\" [name]=\"model.name\" [(ngModel)]=\"model.value\" [value]=\"option.value\"></p-radioButton></div><div [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [innerHTML]=\"option.label\" [ngClass]=\"model.cls.element.label\"></label></div></div></fieldset><div *ngIf=\"!isRadioGroup && !isCheckboxGroup\" [ngClass]=\"model.cls.grid.container\"><div *ngIf=\"!isCheckbox && model.label\" [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label></div><div [ngClass]=\"model.cls.grid.control\"><fieldset *ngSwitchCase=\"'GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><dynamic-form-primeng-control *ngFor=\"let controlModel of model.group\" [controlGroup]=\"control\" [model]=\"controlModel\" [nestedTemplate]=\"customTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-primeng-control></fieldset><div *ngSwitchCase=\"'ARRAY'\" [dynamicId]=\"bindId && model.id\" [formArrayName]=\"model.id\" [ngClass]=\"model.cls.element.control\"><fieldset *ngFor=\"let groupModel of model.groups; let idx = index\" [formGroupName]=\"idx\"><dynamic-form-primeng-control *ngFor=\"let controlModel of groupModel.group\" [bindId]=\"false\" [controlGroup]=\"control.at(idx)\" [model]=\"controlModel\" [nestedTemplate]=\"nestedTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-primeng-control><template [ngTemplateOutlet]=\"customTemplate || nestedTemplate\" [ngOutletContext]=\"groupModel\"></template></fieldset></div><input *ngSwitchCase=\"'INPUT'\" pInputText [attr.accept]=\"model.accept\" [attr.autoComplete]=\"model.autoComplete\" [attr.list]=\"model.listId\" [attr.max]=\"model.max\" [attr.min]=\"model.min\" [attr.multiple]=\"model.multiple\" [attr.step]=\"model.step\" [attr.tabindex]=\"model.tabIndex\" [autofocus]=\"model.autoFocus\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [maxlength]=\"model.maxLength\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [pattern]=\"model.pattern\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [spellcheck]=\"model.spellCheck\" [type]=\"model.inputType\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><datalist *ngIf=\"model.list\" [id]=\"model.listId\"><option *ngFor=\"let option of model.list\" [value]=\"option\"></option></datalist><p-checkbox *ngSwitchCase=\"'CHECKBOX'\" binary=\"true\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [value]=\"model.value\"></p-checkbox><p-dropdown *ngSwitchCase=\"'SELECT'\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [options]=\"model.options\"></p-dropdown><textarea *ngSwitchCase=\"'TEXTAREA'\" pInputTextarea [attr.tabindex]=\"model.tabIndex\" [cols]=\"model.cols\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [maxlength]=\"model.maxLength\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [rows]=\"model.rows\" [spellcheck]=\"model.spellCheck\" [wrap]=\"model.wrap\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></textarea></div><div *ngIf=\"isCheckbox\" [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label></div></div></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormPrimeNGComponent);
    return DynamicFormPrimeNGComponent;
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
var DynamicFormsPrimeNGUIModule = (function () {
    function DynamicFormsPrimeNGUIModule() {
    }
    DynamicFormsPrimeNGUIModule = __decorate$1([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                _angular_forms.ReactiveFormsModule,
                _ng2DynamicForms_core.DynamicFormsCoreModule,
                primeng_components_checkbox_checkbox.CheckboxModule,
                primeng_components_dropdown_dropdown.DropdownModule,
                primeng_components_inputtext_inputtext.InputTextModule,
                primeng_components_inputtextarea_inputtextarea.InputTextareaModule,
                primeng_components_radiobutton_radiobutton.RadioButtonModule,
                primeng_components_spinner_spinner.SpinnerModule
            ],
            declarations: [
                DynamicFormPrimeNGComponent
            ],
            exports: [
                _ng2DynamicForms_core.DynamicFormsCoreModule,
                DynamicFormPrimeNGComponent
            ]
        }), 
        __metadata$1('design:paramtypes', [])
    ], DynamicFormsPrimeNGUIModule);
    return DynamicFormsPrimeNGUIModule;
}());

exports.DYNAMIC_FORM_UI_PRIME_NG = DYNAMIC_FORM_UI_PRIME_NG;
exports.DynamicFormPrimeNGComponent = DynamicFormPrimeNGComponent;
exports.DynamicFormsPrimeNGUIModule = DynamicFormsPrimeNGUIModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
