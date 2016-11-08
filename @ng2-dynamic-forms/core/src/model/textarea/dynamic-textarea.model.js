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
var dynamic_input_control_model_1 = require("../dynamic-input-control.model");
var serializable_decorator_1 = require("../../decorator/serializable.decorator");
var utils_1 = require("../../utils");
exports.DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";
exports.DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
exports.DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";
var DynamicTextAreaModel = (function (_super) {
    __extends(DynamicTextAreaModel, _super);
    function DynamicTextAreaModel(config, cls) {
        _super.call(this, config, cls);
        this.type = exports.DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        this.cols = utils_1.getValue(config, "cols", 20);
        this.rows = utils_1.getValue(config, "rows", 2);
        this.wrap = utils_1.getValue(config, "wrap", exports.DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
    }
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Number)
    ], DynamicTextAreaModel.prototype, "cols", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Number)
    ], DynamicTextAreaModel.prototype, "rows", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicTextAreaModel.prototype, "wrap", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicTextAreaModel.prototype, "type", void 0);
    return DynamicTextAreaModel;
}(dynamic_input_control_model_1.DynamicInputControlModel));
exports.DynamicTextAreaModel = DynamicTextAreaModel;

//# sourceMappingURL=dynamic-textarea.model.js.map
