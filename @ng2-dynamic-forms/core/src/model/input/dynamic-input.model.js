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
exports.DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = "file";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = "time";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = "week";
var DynamicInputModel = (function (_super) {
    __extends(DynamicInputModel, _super);
    function DynamicInputModel(config, cls) {
        _super.call(this, config, cls);
        this.files = null;
        this.listId = null;
        this.type = exports.DYNAMIC_FORM_CONTROL_TYPE_INPUT;
        this.accept = utils_1.getValue(config, "accept", null);
        this.inputType = utils_1.getValue(config, "inputType", exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        this.list = utils_1.getValue(config, "list", null);
        this.max = utils_1.getValue(config, "max", null);
        this.min = utils_1.getValue(config, "min", null);
        this.multiple = utils_1.getValue(config, "multiple", null);
        this.pattern = utils_1.getValue(config, "pattern", null);
        this.step = utils_1.getValue(config, "step", null);
        if (this.list) {
            this.listId = this.id + "List";
        }
    }
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "accept", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicInputModel.prototype, "inputType", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "list", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "max", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "min", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "multiple", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "pattern", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicInputModel.prototype, "step", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicInputModel.prototype, "type", void 0);
    return DynamicInputModel;
}(dynamic_input_control_model_1.DynamicInputControlModel));
exports.DynamicInputModel = DynamicInputModel;

//# sourceMappingURL=dynamic-input.model.js.map
