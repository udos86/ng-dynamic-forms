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
var Subject_1 = require("rxjs/Subject");
var dynamic_form_control_model_1 = require("./dynamic-form-control.model");
var serializable_decorator_1 = require("../decorator/serializable.decorator");
var utils_1 = require("../utils");
var DynamicFormValueControlModel = (function (_super) {
    __extends(DynamicFormValueControlModel, _super);
    function DynamicFormValueControlModel(config, cls) {
        var _this = this;
        _super.call(this, config, cls);
        this.asyncValidators = utils_1.getValue(config, "asyncValidators", []);
        this.errorMessages = utils_1.getValue(config, "errorMessages", null);
        this.hint = utils_1.getValue(config, "hint", null);
        this.required = utils_1.getValue(config, "required", false);
        this.tabIndex = utils_1.getValue(config, "tabIndex", null);
        this.validators = utils_1.getValue(config, "validators", []);
        this._value = utils_1.getValue(config, "value", null);
        this.valueUpdates = new Subject_1.Subject();
        this.valueUpdates.subscribe(function (value) { return _this.value = value; });
    }
    Object.defineProperty(DynamicFormValueControlModel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormValueControlModel.prototype, "hasErrorMessages", {
        get: function () {
            return utils_1.isDefined(this.errorMessages);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormValueControlModel.prototype, "asyncValidators", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "errorMessages", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "hint", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicFormValueControlModel.prototype, "required", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "tabIndex", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormValueControlModel.prototype, "validators", void 0);
    __decorate([
        serializable_decorator_1.serializable("value"), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "_value", void 0);
    return DynamicFormValueControlModel;
}(dynamic_form_control_model_1.DynamicFormControlModel));
exports.DynamicFormValueControlModel = DynamicFormValueControlModel;

//# sourceMappingURL=dynamic-form-value-control.model.js.map
