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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ng2-dynamic-forms/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@ng2-dynamic-forms/core', '@angular/common'], factory) :
    (factory((global.ng2DF = global.ng2DF || {}, global.ng2DF.uiFoundation = global.ng2DF.uiFoundation || {}),global.ng.core,global.ng.forms,global.ng2DF.core,global.ng.common));
}(this, (function (exports,_angular_core,_angular_forms,_ng2DynamicForms_core,_angular_common) { 'use strict';

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
var DYNAMIC_FORM_UI_FOUNDATION_SITES = "FOUNDATION_SITES";
var DynamicFormFoundationSitesComponent = (function (_super) {
    __extends(DynamicFormFoundationSitesComponent, _super);
    function DynamicFormFoundationSitesComponent() {
        _super.call(this);
        this.bindId = true;
        this.hasErrorMessaging = false;
        this.blur = new _angular_core.EventEmitter();
        this.change = new _angular_core.EventEmitter();
        this.focus = new _angular_core.EventEmitter();
        this.type = DYNAMIC_FORM_UI_FOUNDATION_SITES;
    }
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormFoundationSitesComponent.prototype, "bindId", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_forms.FormGroup)
    ], DynamicFormFoundationSitesComponent.prototype, "controlGroup", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormFoundationSitesComponent.prototype, "hasErrorMessaging", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _ng2DynamicForms_core.DynamicFormControlModel)
    ], DynamicFormFoundationSitesComponent.prototype, "model", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_core.TemplateRef)
    ], DynamicFormFoundationSitesComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormFoundationSitesComponent.prototype, "blur", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormFoundationSitesComponent.prototype, "change", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormFoundationSitesComponent.prototype, "focus", void 0);
    __decorate([
        _angular_core.ContentChild(_angular_core.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormFoundationSitesComponent.prototype, "customTemplate", void 0);
    DynamicFormFoundationSitesComponent = __decorate([
        _angular_core.Component({
            selector: "dynamic-form-foundation-sites-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"[model.cls.element.container, model.cls.grid.container]\" [ngSwitch]=\"model.type\"><div *ngIf=\"!isCheckbox && model.label\" [ngClass]=\"model.cls.grid.label\"><label [attr.for]=\"model.id\" [class.is-invalid-label]=\"hasErrorMessaging && !hasFocus && isInvalid\" [innerHTML]=\"model.label\" [ngClass]=\"model.cls.element.label\"></label></div><div [ngClass]=\"model.cls.grid.control\"><div *ngSwitchCase=\"'ARRAY'\" [dynamicId]=\"bindId && model.id\" [formArrayName]=\"model.id\" [ngClass]=\"model.cls.element.control\"><fieldset *ngFor=\"let groupModel of model.groups; let idx = index\" [formGroupName]=\"idx\"><dynamic-form-foundation-sites-control *ngFor=\"let controlModel of groupModel.group\" [bindId]=\"false\" [controlGroup]=\"control.at(idx)\" [hasErrorMessaging]=\"controlModel.hasErrorMessages\" [model]=\"controlModel\" [nestedTemplate]=\"nestedTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-foundation-sites-control><template [ngTemplateOutlet]=\"customTemplate || nestedTemplate\" [ngOutletContext]=\"groupModel\"></template></fieldset></div><fieldset *ngSwitchCase=\"'GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\">{{model.legend}}</legend><dynamic-form-foundation-sites-control *ngFor=\"let controlModel of model.group\" [controlGroup]=\"control\" [hasErrorMessaging]=\"controlModel.hasErrorMessages\" [model]=\"controlModel\" [nestedTemplate]=\"customTemplate\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></dynamic-form-foundation-sites-control></fieldset><label *ngSwitchCase=\"'CHECKBOX'\" [attr.for]=\"model.id\" [ngClass]=\"model.cls.element.label\"><input type=\"checkbox\" [attr.tabindex]=\"model.tabIndex\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [required]=\"model.required\" [value]=\"model.value\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"model.label\"></span></label><fieldset *ngSwitchCase=\"'CHECKBOX_GROUP'\" [dynamicId]=\"bindId && model.id\" [formGroupName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><label *ngFor=\"let item of model.group\" [ngClass]=\"item.cls.element.label\"><input type=\"checkbox\" [attr.tabindex]=\"item.tabIndex\" [dynamicId]=\"bindId && item.id\" [formControlName]=\"item.id\" [name]=\"item.name\" [ngClass]=\"item.cls.element.control\" [required]=\"item.required\" [value]=\"item.value\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"item.label\"></span></label></fieldset><div *ngSwitchCase=\"'INPUT'\" class=\"input-group\"><span *ngIf=\"model.prefix\" class=\"input-group-label\" [innerHTML]=\"model.prefix\"></span> <input class=\"input-group-field\" [attr.accept]=\"model.accept\" [attr.autoComplete]=\"model.autoComplete\" [attr.list]=\"model.listId\" [attr.max]=\"model.max\" [attr.min]=\"model.min\" [attr.multiple]=\"model.multiple\" [attr.step]=\"model.step\" [attr.tabindex]=\"model.tabIndex\" [autofocus]=\"model.autoFocus\" [class.is-invalid-input]=\"hasErrorMessaging && !hasFocus && isInvalid\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [maxlength]=\"model.maxLength\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [pattern]=\"model.pattern\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [spellcheck]=\"model.spellCheck\" [type]=\"model.inputType\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"> <span *ngIf=\"model.suffix\" class=\"input-group-label\" [innerHTML]=\"model.suffix\"></span><datalist *ngIf=\"model.list\" [id]=\"model.listId\"><option *ngFor=\"let option of model.list\" [value]=\"option\"></option></datalist></div><fieldset *ngSwitchCase=\"'RADIO_GROUP'\" role=\"radiogroup\" [attr.tabindex]=\"model.tabIndex\" [dynamicId]=\"bindId && model.id\" [name]=\"model.name\" (change)=\"onChange($event)\"><legend *ngIf=\"model.legend\" [innerHTML]=\"model.legend\"></legend><label *ngFor=\"let option of model.options\"><input type=\"radio\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [value]=\"option.value\" (blur)=\"onBlur($event)\" (focus)=\"onFocus($event)\"><span [innerHTML]=\"option.label\"></span></label></fieldset><select *ngSwitchCase=\"'SELECT'\" [attr.tabindex]=\"model.tabIndex\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [required]=\"model.required\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"><option *ngFor=\"let option of model.options\" [attr.name]=\"model.name\" [ngValue]=\"option.value\">{{option.label}}</option></select><textarea *ngSwitchCase=\"'TEXTAREA'\" [attr.tabindex]=\"model.tabIndex\" [class.is-invalid-input]=\"hasErrorMessaging && !hasFocus && isInvalid\" [cols]=\"model.cols\" [dynamicId]=\"bindId && model.id\" [formControlName]=\"model.id\" [maxlength]=\"model.maxLength\" [minlength]=\"model.minLength\" [name]=\"model.name\" [ngClass]=\"model.cls.element.control\" [placeholder]=\"model.placeholder\" [readonly]=\"model.readOnly\" [required]=\"model.required\" [rows]=\"model.rows\" [spellcheck]=\"model.spellCheck\" [wrap]=\"model.wrap\" (blur)=\"onBlur($event)\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\"></textarea><p *ngIf=\"model.hint\" class=\"help-text\" [innerHTML]=\"model.hint\"></p></div><div *ngIf=\"hasErrorMessaging\" [ngClass]=\"[model.cls.element.errors, model.cls.grid.errors]\"><span *ngFor=\"let message of errorMessages\" class=\"form-error\" [class.is-visible]=\"!hasFocus && isInvalid\">{{message}}</span></div><ng-content></ng-content></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormFoundationSitesComponent);
    return DynamicFormFoundationSitesComponent;
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
var DynamicFormsFoundationUIModule = (function () {
    function DynamicFormsFoundationUIModule() {
    }
    DynamicFormsFoundationUIModule = __decorate$1([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                _angular_forms.ReactiveFormsModule,
                _ng2DynamicForms_core.DynamicFormsCoreModule
            ],
            declarations: [
                DynamicFormFoundationSitesComponent
            ],
            exports: [
                _ng2DynamicForms_core.DynamicFormsCoreModule,
                DynamicFormFoundationSitesComponent
            ]
        }), 
        __metadata$1('design:paramtypes', [])
    ], DynamicFormsFoundationUIModule);
    return DynamicFormsFoundationUIModule;
}());

exports.DYNAMIC_FORM_UI_FOUNDATION_SITES = DYNAMIC_FORM_UI_FOUNDATION_SITES;
exports.DynamicFormFoundationSitesComponent = DynamicFormFoundationSitesComponent;
exports.DynamicFormsFoundationUIModule = DynamicFormsFoundationUIModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
