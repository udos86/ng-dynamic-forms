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
var DynamicFormArrayGroupModel = (function () {
    function DynamicFormArrayGroupModel(context, group, index) {
        if (group === void 0) { group = []; }
        if (index === void 0) { index = null; }
        this.context = context;
        this.group = group;
        this.index = index;
    }
    DynamicFormArrayGroupModel.prototype.toJSON = function () {
        return utils_1.serialize(this);
    };
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormArrayGroupModel.prototype, "group", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormArrayGroupModel.prototype, "index", void 0);
    return DynamicFormArrayGroupModel;
}());
exports.DynamicFormArrayGroupModel = DynamicFormArrayGroupModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";
var DynamicFormArrayModel = (function (_super) {
    __extends(DynamicFormArrayModel, _super);
    function DynamicFormArrayModel(config, cls) {
        var _this = this;
        _super.call(this, config, cls);
        this.groups = [];
        this.type = exports.DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
        if (!utils_1.isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }
        this.asyncValidator = utils_1.getValue(config, "asyncValidator", null);
        this.createGroup = config["createGroup"];
        this.initialCount = utils_1.getValue(config, "initialCount", 1);
        this.originGroup = this.createGroup();
        this.validator = utils_1.getValue(config, "validator", null);
        if (Array.isArray(config.groups)) {
            config.groups.forEach(function (arrayGroup, index) {
                _this.groups.push(new DynamicFormArrayGroupModel(_this, arrayGroup.group, arrayGroup.index || index));
            });
        }
        else {
            for (var i = 0; i < this.initialCount; i += 1) {
                this.addGroup();
            }
        }
    }
    DynamicFormArrayModel.prototype.updateGroupIndex = function () {
        this.groups.forEach(function (group, index) { return group.index = index; });
    };
    DynamicFormArrayModel.prototype.addGroup = function () {
        var group = new DynamicFormArrayGroupModel(this, this.createGroup());
        this.groups.push(group);
        this.updateGroupIndex();
        return group;
    };
    DynamicFormArrayModel.prototype.insertGroup = function (index) {
        var group = new DynamicFormArrayGroupModel(this, this.createGroup());
        this.groups.splice(index, 0, group);
        this.updateGroupIndex();
        return group;
    };
    DynamicFormArrayModel.prototype.removeGroup = function (index) {
        this.groups.splice(index, 1);
        this.updateGroupIndex();
    };
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormArrayModel.prototype, "asyncValidator", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormArrayModel.prototype, "groups", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Number)
    ], DynamicFormArrayModel.prototype, "initialCount", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormArrayModel.prototype, "validator", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicFormArrayModel.prototype, "type", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormArrayModel.prototype, "originGroup", void 0);
    return DynamicFormArrayModel;
}(dynamic_form_control_model_1.DynamicFormControlModel));
exports.DynamicFormArrayModel = DynamicFormArrayModel;

//# sourceMappingURL=dynamic-form-array.model.js.map
