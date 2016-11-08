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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ng2-dynamic-forms/core'), require('@angular/common'), require('@progress/kendo-angular-dropdowns'), require('@progress/kendo-angular-inputs')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@ng2-dynamic-forms/core', '@angular/common', '@progress/kendo-angular-dropdowns', '@progress/kendo-angular-inputs'], factory) :
    (factory((global.ng2DF = global.ng2DF || {}, global.ng2DF.uiKendo = global.ng2DF.uiKendo || {}),global.ng.core,global.ng.forms,global.ng2DF.core,global.ng.common,global.progress/kendo-angular-dropdowns,global.progress/kendo-angular-inputs));
}(this, (function (exports,_angular_core,_angular_forms,_ng2DynamicForms_core,_angular_common,_progress_kendoAngularDropdowns,_progress_kendoAngularInputs) { 'use strict';

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
var DYNAMIC_FORM_UI_KENDO = "KENDO";
var DynamicFormKendoComponent = (function (_super) {
    __extends(DynamicFormKendoComponent, _super);
    function DynamicFormKendoComponent() {
        _super.call(this);
        this.bindId = true;
        this.blur = new _angular_core.EventEmitter();
        this.change = new _angular_core.EventEmitter();
        this.focus = new _angular_core.EventEmitter();
        this.type = DYNAMIC_FORM_UI_KENDO;
    }
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Boolean)
    ], DynamicFormKendoComponent.prototype, "bindId", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_forms.FormGroup)
    ], DynamicFormKendoComponent.prototype, "controlGroup", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _ng2DynamicForms_core.DynamicFormControlModel)
    ], DynamicFormKendoComponent.prototype, "model", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', _angular_core.TemplateRef)
    ], DynamicFormKendoComponent.prototype, "nestedTemplate", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormKendoComponent.prototype, "blur", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormKendoComponent.prototype, "change", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', _angular_core.EventEmitter)
    ], DynamicFormKendoComponent.prototype, "focus", void 0);
    __decorate([
        _angular_core.ContentChild(_angular_core.TemplateRef), 
        __metadata('design:type', Object)
    ], DynamicFormKendoComponent.prototype, "customTemplate", void 0);
    DynamicFormKendoComponent = __decorate([
        _angular_core.Component({
            selector: "dynamic-form-kendo-control",
            template: "<div [formGroup]=\"controlGroup\" [ngClass]=\"[model.cls.element.container, model.cls.grid.container]\" [ngSwitch]=\"model.type\"><label [attr.for]=\"model.id\" [innerHTML]=\"model.label\" [ngClass]=\"[model.cls.element.label, model.cls.grid.label]\"></label><kendo-dropdownlist *ngSwitchCase=\"'SELECT'\" [data]=\"model.options\" [formControlName]=\"model.id\" [textField]=\"'label'\" [valueField]=\"'value'\"></kendo-dropdownlist><ng-content></ng-content></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormKendoComponent);
    return DynamicFormKendoComponent;
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
var DynamicFormsKendoUIModule = (function () {
    function DynamicFormsKendoUIModule() {
    }
    DynamicFormsKendoUIModule = __decorate$1([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                _angular_forms.ReactiveFormsModule,
                _progress_kendoAngularDropdowns.DropDownsModule,
                _progress_kendoAngularInputs.InputsModule,
                _ng2DynamicForms_core.DynamicFormsCoreModule
            ],
            declarations: [
                DynamicFormKendoComponent
            ],
            exports: [
                _ng2DynamicForms_core.DynamicFormsCoreModule,
                DynamicFormKendoComponent
            ]
        }), 
        __metadata$1('design:paramtypes', [])
    ], DynamicFormsKendoUIModule);
    return DynamicFormsKendoUIModule;
}());

exports.DYNAMIC_FORM_UI_KENDO = DYNAMIC_FORM_UI_KENDO;
exports.DynamicFormKendoComponent = DynamicFormKendoComponent;
exports.DynamicFormsKendoUIModule = DynamicFormsKendoUIModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
