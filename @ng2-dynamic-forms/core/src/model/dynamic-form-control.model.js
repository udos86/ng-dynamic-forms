"use strict";
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
var serializable_decorator_1 = require("../decorator/serializable.decorator");
var utils_1 = require("../utils");
var DynamicFormControlModel = (function () {
    function DynamicFormControlModel(config, cls) {
        var _this = this;
        this.cls = {};
        if (utils_1.isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }
        this.cls.element = utils_1.getValue(cls, "element", { container: "", control: "", errors: "", label: "" });
        this.cls.grid = utils_1.getValue(cls, "grid", { container: "", control: "", errors: "", label: "" });
        this._disabled = utils_1.getValue(config, "disabled", false);
        this.id = config.id;
        this.label = utils_1.getValue(config, "label", null);
        this.name = this.id;
        this.relation = utils_1.getValue(config, "relation", []);
        this.disabledUpdates = new Subject_1.Subject();
        this.disabledUpdates.subscribe(function (value) { return _this.disabled = value; });
    }
    Object.defineProperty(DynamicFormControlModel.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormControlModel.prototype.toJSON = function () {
        return utils_1.serialize(this);
    };
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormControlModel.prototype, "cls", void 0);
    __decorate([
        serializable_decorator_1.serializable("disabled"), 
        __metadata('design:type', Boolean)
    ], DynamicFormControlModel.prototype, "_disabled", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicFormControlModel.prototype, "id", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormControlModel.prototype, "label", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', String)
    ], DynamicFormControlModel.prototype, "name", void 0);
    __decorate([
        serializable_decorator_1.serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormControlModel.prototype, "relation", void 0);
    return DynamicFormControlModel;
}());
exports.DynamicFormControlModel = DynamicFormControlModel;

//# sourceMappingURL=dynamic-form-control.model.js.map
