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
var dynamic_form_value_control_model_1 = require("./dynamic-form-value-control.model");
var dynamic_form_autofill_service_1 = require("../service/dynamic-form-autofill.service");
var serializable_decorator_1 = require("../decorator/serializable.decorator");
var utils_1 = require("../utils");
var DynamicInputControlModel = (function (_super) {
    __extends(DynamicInputControlModel, _super);
    function DynamicInputControlModel(config, cls) {
        _super.call(this, config, cls);
        this.autoComplete = utils_1.getValue(config, "autoComplete", dynamic_form_autofill_service_1.AUTOCOMPLETE_ON);
        this.autoFocus = utils_1.getValue(config, "autoFocus", false);
        this.maxLength = utils_1.getValue(config, "maxLength", null);
        this.minLength = utils_1.getValue(config, "minLength", null);
        this.placeholder = utils_1.getValue(config, "placeholder", "");
        this.prefix = utils_1.getValue(config, "prefix", null);
        this.readOnly = utils_1.getValue(config, "readOnly", false);
        this.spellCheck = utils_1.getValue(config, "spellCheck", false);
        this.suffix = utils_1.getValue(config, "suffix", null);
    }
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "autoComplete", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "autoFocus", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputControlModel.prototype, "maxLength", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputControlModel.prototype, "minLength", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicInputControlModel.prototype, "placeholder", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputControlModel.prototype, "prefix", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "readOnly", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "spellCheck", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputControlModel.prototype, "suffix", void 0);
    return DynamicInputControlModel;
}(dynamic_form_value_control_model_1.DynamicFormValueControlModel));
exports.DynamicInputControlModel = DynamicInputControlModel;

//# sourceMappingURL=dynamic-input-control.model.js.map
