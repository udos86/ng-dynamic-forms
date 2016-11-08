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
var dynamic_form_value_control_model_1 = require("../dynamic-form-value-control.model");
var serializable_decorator_1 = require("../../decorator/serializable.decorator");
var utils_1 = require("../../utils");
exports.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";
exports.DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START = "start";
exports.DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_END = "end";
var DynamicCheckboxModel = (function (_super) {
    __extends(DynamicCheckboxModel, _super);
    function DynamicCheckboxModel(config, cls) {
        _super.call(this, config, cls);
        this.type = exports.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
        this.align = utils_1.getValue(config, "align", exports.DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);
        this.indeterminate = utils_1.getValue(config, "indeterminate", false);
        if (this.value !== true) {
            this.value = false;
        }
    }
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicCheckboxModel.prototype, "align", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicCheckboxModel.prototype, "indeterminate", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicCheckboxModel.prototype, "type", void 0);
    return DynamicCheckboxModel;
}(dynamic_form_value_control_model_1.DynamicFormValueControlModel));
exports.DynamicCheckboxModel = DynamicCheckboxModel;

//# sourceMappingURL=dynamic-checkbox.model.js.map
