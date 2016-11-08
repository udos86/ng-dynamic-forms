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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_form_array_model_1 = require("../model/form-array/dynamic-form-array.model");
var dynamic_form_group_model_1 = require("../model/form-group/dynamic-form-group.model");
var dynamic_checkbox_group_model_1 = require("../model/checkbox/dynamic-checkbox-group.model");
var dynamic_checkbox_model_1 = require("../model/checkbox/dynamic-checkbox.model");
var dynamic_input_model_1 = require("../model/input/dynamic-input.model");
var dynamic_radio_group_model_1 = require("../model/radio/dynamic-radio-group.model");
var dynamic_select_model_1 = require("../model/select/dynamic-select.model");
var dynamic_textarea_model_1 = require("../model/textarea/dynamic-textarea.model");
var utils_1 = require("../utils");
var DynamicFormService = (function () {
    function DynamicFormService(formBuilder) {
        this.formBuilder = formBuilder;
    }
    DynamicFormService.prototype.createFormArray = function (model) {
        var _this = this;
        var formArray = [];
        model.groups.forEach(function (arrayGroupModel) {
            formArray.push(_this.createFormGroup(arrayGroupModel.group));
        });
        return this.formBuilder.array(formArray, model.validator, model.asyncValidator);
    };
    DynamicFormService.prototype.createFormGroup = function (group, groupExtra) {
        var _this = this;
        if (groupExtra === void 0) { groupExtra = null; }
        var formGroup = {};
        group.forEach(function (model) {
            if (model.type === dynamic_form_array_model_1.DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {
                var arrayModel = model;
                formGroup[model.id] = _this.createFormArray(arrayModel);
            }
            else if (model.type === dynamic_form_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_GROUP || model.type === dynamic_checkbox_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {
                var groupModel = model, groupExtra_1 = { validator: groupModel.validator, asyncValidator: groupModel.asyncValidator };
                formGroup[model.id] = _this.createFormGroup(groupModel.group, groupExtra_1);
            }
            else {
                var controlModel = model;
                formGroup[controlModel.id] = new forms_1.FormControl({ value: controlModel.value, disabled: controlModel.disabled }, forms_1.Validators.compose(controlModel.validators), forms_1.Validators.composeAsync(controlModel.asyncValidators));
            }
        });
        return this.formBuilder.group(formGroup, groupExtra);
    };
    DynamicFormService.prototype.createFormArrayGroup = function (dynamicFormArrayModel) {
        return this.createFormGroup(dynamicFormArrayModel.addGroup().group);
    };
    DynamicFormService.prototype.addFormArrayGroup = function (formArray, dynamicFormArrayModel) {
        formArray.push(this.createFormArrayGroup(dynamicFormArrayModel));
    };
    DynamicFormService.prototype.insertFormArrayGroup = function (index, formArray, dynamicFormArrayModel) {
        formArray.insert(index, this.createFormGroup(dynamicFormArrayModel.insertGroup(index).group));
    };
    DynamicFormService.prototype.removeFormArrayGroup = function (index, formArray, dynamicFormArrayModel) {
        formArray.removeAt(index);
        dynamicFormArrayModel.removeGroup(index);
    };
    DynamicFormService.prototype.clearFormArray = function (formArray, dynamicFormArrayModel) {
        while (formArray.length > 0) {
            this.removeFormArrayGroup(0, formArray, dynamicFormArrayModel);
        }
    };
    DynamicFormService.prototype.findById = function (id, group) {
        return group.find(function (controlModel) { return controlModel.id === id; });
    };
    DynamicFormService.prototype.fromJSON = function (json) {
        var _this = this;
        var formModel = [];
        json.forEach(function (object) {
            ["asyncValidator", "validator"].forEach(function (prop) {
                object[prop] = utils_1.deserializeValidator(object[prop]);
            });
            ["asyncValidators", "validators"].forEach(function (prop) {
                if (Array.isArray(object[prop])) {
                    object[prop] = utils_1.deserializeValidators(object[prop]);
                }
            });
            switch (object["type"]) {
                case dynamic_form_array_model_1.DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    object["groups"].forEach(function (groupObject) { return groupObject["group"] = _this.fromJSON(groupObject["group"]); });
                    object["createGroup"] = function () { return _this.fromJSON(object["originGroup"]); };
                    formModel.push(new dynamic_form_array_model_1.DynamicFormArrayModel(object, object["cls"]));
                    break;
                case dynamic_checkbox_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    formModel.push(new dynamic_checkbox_model_1.DynamicCheckboxModel(object, object["cls"]));
                    break;
                case dynamic_checkbox_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    object["group"] = _this.fromJSON(object["group"]);
                    formModel.push(new dynamic_checkbox_group_model_1.DynamicCheckboxGroupModel(object, object["cls"]));
                    break;
                case dynamic_form_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    object["group"] = _this.fromJSON(object["group"]);
                    formModel.push(new dynamic_form_group_model_1.DynamicFormGroupModel(object, object["cls"]));
                    break;
                case dynamic_input_model_1.DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    formModel.push(new dynamic_input_model_1.DynamicInputModel(object, object["cls"]));
                    break;
                case dynamic_radio_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    formModel.push(new dynamic_radio_group_model_1.DynamicRadioGroupModel(object, object["cls"]));
                    break;
                case dynamic_select_model_1.DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    formModel.push(new dynamic_select_model_1.DynamicSelectModel(object, object["cls"]));
                    break;
                case dynamic_textarea_model_1.DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    formModel.push(new dynamic_textarea_model_1.DynamicTextAreaModel(object, object["cls"]));
                    break;
                default:
                    throw new Error("unknown form control type defined on JSON object");
            }
        });
        return formModel;
    };
    DynamicFormService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], DynamicFormService);
    return DynamicFormService;
}());
exports.DynamicFormService = DynamicFormService;

//# sourceMappingURL=dynamic-form.service.js.map
