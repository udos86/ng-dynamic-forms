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
var dynamic_form_control_model_1 = require("../dynamic-form-control.model");
var serializable_decorator_1 = require("../../decorator/serializable.decorator");
var utils_1 = require("../../utils");
exports.DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";
var DynamicFormGroupModel = (function (_super) {
    __extends(DynamicFormGroupModel, _super);
    function DynamicFormGroupModel(config, cls) {
        _super.call(this, config, cls);
        this.group = [];
        this.type = exports.DYNAMIC_FORM_CONTROL_TYPE_GROUP;
        if (!Array.isArray(config["group"])) {
            throw new Error("group array must be specified for DynamicFormGroupModel");
        }
        this.asyncValidator = utils_1.getValue(config, "asyncValidator", null);
        this.group = utils_1.getValue(config, "group", []);
        this.legend = utils_1.getValue(config, "legend", null);
        this.validator = utils_1.getValue(config, "validator", null);
    }
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormGroupModel.prototype, "asyncValidator", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormGroupModel.prototype, "group", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormGroupModel.prototype, "legend", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormGroupModel.prototype, "validator", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicFormGroupModel.prototype, "type", void 0);
    return DynamicFormGroupModel;
}(dynamic_form_control_model_1.DynamicFormControlModel));
exports.DynamicFormGroupModel = DynamicFormGroupModel;

//# sourceMappingURL=dynamic-form-group.model.js.map
