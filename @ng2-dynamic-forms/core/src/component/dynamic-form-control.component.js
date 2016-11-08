"use strict";
var dynamic_form_value_control_model_1 = require("../model/dynamic-form-value-control.model");
var dynamic_checkbox_model_1 = require("../model/checkbox/dynamic-checkbox.model");
var dynamic_checkbox_group_model_1 = require("../model/checkbox/dynamic-checkbox-group.model");
var dynamic_radio_group_model_1 = require("../model/radio/dynamic-radio-group.model");
var dynamic_switch_model_1 = require("../model/switch/dynamic-switch.model");
var dynamic_input_model_1 = require("../model/input/dynamic-input.model");
var dynamic_form_control_relation_model_1 = require("../model/dynamic-form-control-relation.model");
var utils_1 = require("../utils");
var DynamicFormControlComponent = (function () {
    function DynamicFormControlComponent() {
        this.hasErrorMessaging = false;
        this.subscriptions = [];
    }
    DynamicFormControlComponent.prototype.ngOnInit = function () {
        if (!utils_1.isDefined(this.model)) {
            throw new Error("no model input defined for DynamicFormControlComponent");
        }
        if (!utils_1.isDefined(this.controlGroup)) {
            throw new Error("no controlGroup input defined for DynamicFormControlComponent");
        }
        this.control = this.controlGroup.get(this.model.id);
        this.subscriptions.push(this.control.valueChanges.subscribe(this.onControlValueChanges.bind(this)));
        this.subscriptions.push(this.model.disabledUpdates.subscribe(this.onModelDisabledUpdates.bind(this)));
        if (this.model instanceof dynamic_form_value_control_model_1.DynamicFormValueControlModel) {
            var model = this.model;
            this.subscriptions.push(model.valueUpdates.subscribe(this.onModelValueUpdates.bind(this)));
        }
        this.registerControlRelations();
    };
    DynamicFormControlComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    Object.defineProperty(DynamicFormControlComponent.prototype, "errorMessages", {
        get: function () {
            var _this = this;
            var messages = [];
            if (utils_1.isDefined(this.model["errorMessages"])) {
                for (var validatorName in this.control.errors) {
                    var message = void 0;
                    if (this.model["errorMessages"][validatorName]) {
                        message = this.model["errorMessages"][validatorName].replace(/\{\{(.+?)\}\}/mg, function (match, propertyName) { return _this.model[propertyName] ? _this.model[propertyName] : null; });
                    }
                    else {
                        message = "Validation \"" + validatorName + "\" failed";
                    }
                    messages.push(message);
                }
            }
            return messages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isCheckbox", {
        get: function () {
            return this.model.type === dynamic_checkbox_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isCheckboxGroup", {
        get: function () {
            return this.model.type === dynamic_checkbox_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isRadioGroup", {
        get: function () {
            return this.model.type === dynamic_radio_group_model_1.DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isSwitch", {
        get: function () {
            return this.model.type === dynamic_switch_model_1.DYNAMIC_FORM_CONTROL_TYPE_SWITCH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isValid", {
        get: function () {
            return this.control.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isInvalid", {
        get: function () {
            return this.control.touched && this.control.invalid;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormControlComponent.prototype.registerControlRelations = function () {
        var _this = this;
        if (this.model.relation.length > 0 && dynamic_form_control_relation_model_1.findActivationRelation(this.model.relation)) {
            this.setControlActivationState();
            dynamic_form_control_relation_model_1.findIds(this.model.relation).forEach(function (controlId) {
                if (_this.model.id === controlId) {
                    throw new Error("FormControl " + _this.model.id + " cannot depend on itself");
                }
                var control = _this.controlGroup.get(controlId);
                if (control) {
                    _this.subscriptions.push(control.valueChanges.subscribe(function (value) { return _this.setControlActivationState(); }));
                    _this.subscriptions.push(control.statusChanges.subscribe(function (status) { return _this.setControlActivationState(); }));
                }
            });
        }
    };
    DynamicFormControlComponent.prototype.setControlActivationState = function () {
        this.model.disabledUpdates.next(dynamic_form_control_relation_model_1.toBeDisabled(dynamic_form_control_relation_model_1.findActivationRelation(this.model.relation), this.controlGroup));
    };
    DynamicFormControlComponent.prototype.onControlValueChanges = function (value) {
        if (this.model instanceof dynamic_form_value_control_model_1.DynamicFormValueControlModel) {
            this.model.value = value;
        }
    };
    DynamicFormControlComponent.prototype.onModelDisabledUpdates = function (value) {
        value ? this.control.disable() : this.control.enable();
    };
    DynamicFormControlComponent.prototype.onModelValueUpdates = function (value) {
        this.control.setValue(value);
    };
    DynamicFormControlComponent.prototype.onBlur = function ($event) {
        this.blur.emit($event);
        this.hasFocus = false;
    };
    DynamicFormControlComponent.prototype.onChange = function ($event) {
        this.change.emit($event);
        if (this.model.type === dynamic_input_model_1.DYNAMIC_FORM_CONTROL_TYPE_INPUT) {
            var inputModel = this.model;
            if (inputModel.inputType === dynamic_input_model_1.DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
                inputModel.files = $event.srcElement["files"];
            }
        }
    };
    DynamicFormControlComponent.prototype.onFocus = function ($event) {
        this.focus.emit($event);
        this.hasFocus = true;
    };
    return DynamicFormControlComponent;
}());
exports.DynamicFormControlComponent = DynamicFormControlComponent;

//# sourceMappingURL=dynamic-form-control.component.js.map
