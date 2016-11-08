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
var serializable_decorator_1 = require("../decorator/serializable.decorator");
var utils_1 = require("../utils");
var DynamicFormOption = (function () {
    function DynamicFormOption(config) {
        this.disabled = utils_1.getValue(config, "disabled", false);
        this.label = utils_1.getValue(config, "label", null);
        this.value = config.value;
    }
    Object.defineProperty(DynamicFormOption.prototype, "text", {
        get: function () {
            return this.label;
        },
        set: function (text) {
            this.label = text;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormOption.prototype.toJSON = function () {
        return utils_1.serialize(this);
    };
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicFormOption.prototype, "disabled", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormOption.prototype, "label", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormOption.prototype, "value", void 0);
    return DynamicFormOption;
}());
exports.DynamicFormOption = DynamicFormOption;
var DynamicOptionControlModel = (function (_super) {
    __extends(DynamicOptionControlModel, _super);
    function DynamicOptionControlModel(config, cls) {
        _super.call(this, config, cls);
        this.options = config.options ? config.options.map(function (optionConfig) { return new DynamicFormOption(optionConfig); }) : [];
    }
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicOptionControlModel.prototype, "options", void 0);
    return DynamicOptionControlModel;
}(dynamic_form_value_control_model_1.DynamicFormValueControlModel));
exports.DynamicOptionControlModel = DynamicOptionControlModel;

//# sourceMappingURL=dynamic-option-control.model.js.map
