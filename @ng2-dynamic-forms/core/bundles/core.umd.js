/*!
ng2-dynamic-forms 1.1.2 2016-11-08 15:46 UTC
Copyright (c) 2016, Udo Schöfer http://www.udos86.de

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/Subject'), require('@angular/forms'), require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', 'rxjs/Subject', '@angular/forms', '@angular/core', '@angular/common'], factory) :
    (factory((global.ng2DF = global.ng2DF || {}, global.ng2DF.core = global.ng2DF.core || {}),global.Rx,global.ng.forms,global.ng.core,global.ng.common));
}(this, (function (exports,rxjs_Subject,_angular_forms,_angular_core,_angular_common) { 'use strict';

var METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";
function serializable(name) {
    return function (target, key) {
        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, { key: key, name: name || key }, target, key);
    };
}
function getSerializables(target) {
    var serializables = [];
    for (var key in target) {
        var metadata = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, target, key);
        if (metadata) {
            serializables.push(metadata);
        }
    }
    return serializables;
}

function isDefined(object) {
    return object !== undefined && object !== null;
}
function isEmptyString(_string) {
    return typeof _string !== "string" || _string.length === 0;
}
function isFunction(object) {
    return typeof object === "function";
}
function getValue(object, key, defaultValue) {
    if (object === undefined || object === null) {
        return defaultValue;
    }
    var value = object[key];
    if (value === undefined && defaultValue !== undefined) {
        return defaultValue;
    }
    if (typeof value === "object" && typeof defaultValue === "object") {
        for (var property in value) {
            if (value.hasOwnProperty(property) && typeof value[property] === "object") {
                value[property] = getValue(value, property, defaultValue ? defaultValue[property] : null);
            }
        }
        return defaultValue ? Object.assign(defaultValue, value) : value;
    }
    return value;
}
function serializeValidator(validator) {
    for (var validatorName in _angular_forms.Validators) {
        if (_angular_forms.Validators.hasOwnProperty(validatorName) && validator === _angular_forms.Validators[validatorName]) {
            return validatorName;
        }
    }
    return null;
}
function serializeValidators(validators) {
    var serialized = [];
    validators.forEach(function (validator) {
        var validatorName = serializeValidator(validator);
        if (validatorName) {
            serialized.push(validatorName);
        }
    });
    return serialized;
}
function deserializeValidator(serialized) {
    return _angular_forms.Validators[serialized];
}
function deserializeValidators(serialized) {
    return serialized.map(function (validatorName) { return deserializeValidator(validatorName); });
}
function serialize(target, prototype) {
    return getSerializables(prototype || target).reduce(function (prev, prop) {
        if (prop.key === "validators" || prop.key === "asyncValidators") {
            prev[prop.name] = serializeValidators(target[prop.key]);
        }
        else if (prop.key === "validator" || prop.key === "asyncValidator") {
            prev[prop.name] = serializeValidator(target[prop.key]);
        }
        else {
            prev[prop.name] = target[prop.key];
        }
        return prev;
    }, {});
}

var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicFormControlModel = (function () {
    function DynamicFormControlModel(config, cls) {
        var _this = this;
        this.cls = {};
        if (isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }
        this.cls.element = getValue(cls, "element", { container: "", control: "", errors: "", label: "" });
        this.cls.grid = getValue(cls, "grid", { container: "", control: "", errors: "", label: "" });
        this._disabled = getValue(config, "disabled", false);
        this.id = config.id;
        this.label = getValue(config, "label", null);
        this.name = this.id;
        this.relation = getValue(config, "relation", []);
        this.disabledUpdates = new rxjs_Subject.Subject();
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
        return serialize(this);
    };
    __decorate$1([
        serializable(), 
        __metadata$1('design:type', Object)
    ], DynamicFormControlModel.prototype, "cls", void 0);
    __decorate$1([
        serializable("disabled"), 
        __metadata$1('design:type', Boolean)
    ], DynamicFormControlModel.prototype, "_disabled", void 0);
    __decorate$1([
        serializable(), 
        __metadata$1('design:type', String)
    ], DynamicFormControlModel.prototype, "id", void 0);
    __decorate$1([
        serializable(), 
        __metadata$1('design:type', Object)
    ], DynamicFormControlModel.prototype, "label", void 0);
    __decorate$1([
        serializable(), 
        __metadata$1('design:type', String)
    ], DynamicFormControlModel.prototype, "name", void 0);
    __decorate$1([
        serializable(), 
        __metadata$1('design:type', Array)
    ], DynamicFormControlModel.prototype, "relation", void 0);
    return DynamicFormControlModel;
}());

var __extends = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicFormValueControlModel = (function (_super) {
    __extends(DynamicFormValueControlModel, _super);
    function DynamicFormValueControlModel(config, cls) {
        var _this = this;
        _super.call(this, config, cls);
        this.asyncValidators = getValue(config, "asyncValidators", []);
        this.errorMessages = getValue(config, "errorMessages", null);
        this.hint = getValue(config, "hint", null);
        this.required = getValue(config, "required", false);
        this.tabIndex = getValue(config, "tabIndex", null);
        this.validators = getValue(config, "validators", []);
        this._value = getValue(config, "value", null);
        this.valueUpdates = new rxjs_Subject.Subject();
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
            return isDefined(this.errorMessages);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormValueControlModel.prototype, "asyncValidators", void 0);
    __decorate([
        serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "errorMessages", void 0);
    __decorate([
        serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "hint", void 0);
    __decorate([
        serializable(), 
        __metadata('design:type', Boolean)
    ], DynamicFormValueControlModel.prototype, "required", void 0);
    __decorate([
        serializable(), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "tabIndex", void 0);
    __decorate([
        serializable(), 
        __metadata('design:type', Array)
    ], DynamicFormValueControlModel.prototype, "validators", void 0);
    __decorate([
        serializable("value"), 
        __metadata('design:type', Object)
    ], DynamicFormValueControlModel.prototype, "_value", void 0);
    return DynamicFormValueControlModel;
}(DynamicFormControlModel));

var __extends$1 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$2 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";
var DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START = "start";
var DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_END = "end";
var DynamicCheckboxModel = (function (_super) {
    __extends$1(DynamicCheckboxModel, _super);
    function DynamicCheckboxModel(config, cls) {
        _super.call(this, config, cls);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
        this.align = getValue(config, "align", DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);
        this.indeterminate = getValue(config, "indeterminate", false);
        if (this.value !== true) {
            this.value = false;
        }
    }
    __decorate$2([
        serializable(), 
        __metadata$2('design:type', String)
    ], DynamicCheckboxModel.prototype, "align", void 0);
    __decorate$2([
        serializable(), 
        __metadata$2('design:type', Boolean)
    ], DynamicCheckboxModel.prototype, "indeterminate", void 0);
    __decorate$2([
        serializable(), 
        __metadata$2('design:type', String)
    ], DynamicCheckboxModel.prototype, "type", void 0);
    return DynamicCheckboxModel;
}(DynamicFormValueControlModel));

var __extends$3 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$4 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";
var DynamicFormGroupModel = (function (_super) {
    __extends$3(DynamicFormGroupModel, _super);
    function DynamicFormGroupModel(config, cls) {
        _super.call(this, config, cls);
        this.group = [];
        this.type = DYNAMIC_FORM_CONTROL_TYPE_GROUP;
        if (!Array.isArray(config["group"])) {
            throw new Error("group array must be specified for DynamicFormGroupModel");
        }
        this.asyncValidator = getValue(config, "asyncValidator", null);
        this.group = getValue(config, "group", []);
        this.legend = getValue(config, "legend", null);
        this.validator = getValue(config, "validator", null);
    }
    __decorate$4([
        serializable(), 
        __metadata$4('design:type', Object)
    ], DynamicFormGroupModel.prototype, "asyncValidator", void 0);
    __decorate$4([
        serializable(), 
        __metadata$4('design:type', Array)
    ], DynamicFormGroupModel.prototype, "group", void 0);
    __decorate$4([
        serializable(), 
        __metadata$4('design:type', Object)
    ], DynamicFormGroupModel.prototype, "legend", void 0);
    __decorate$4([
        serializable(), 
        __metadata$4('design:type', Object)
    ], DynamicFormGroupModel.prototype, "validator", void 0);
    __decorate$4([
        serializable(), 
        __metadata$4('design:type', String)
    ], DynamicFormGroupModel.prototype, "type", void 0);
    return DynamicFormGroupModel;
}(DynamicFormControlModel));

var __extends$2 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$3 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";
var DynamicCheckboxGroupModel = (function (_super) {
    __extends$2(DynamicCheckboxGroupModel, _super);
    function DynamicCheckboxGroupModel(config, cls) {
        _super.call(this, config, cls);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }
    __decorate$3([
        serializable(), 
        __metadata$3('design:type', Array)
    ], DynamicCheckboxGroupModel.prototype, "group", void 0);
    __decorate$3([
        serializable(), 
        __metadata$3('design:type', String)
    ], DynamicCheckboxGroupModel.prototype, "type", void 0);
    return DynamicCheckboxGroupModel;
}(DynamicFormGroupModel));

var __extends$5 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$6 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicFormOption = (function () {
    function DynamicFormOption(config) {
        this.disabled = getValue(config, "disabled", false);
        this.label = getValue(config, "label", null);
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
        return serialize(this);
    };
    __decorate$6([
        serializable(), 
        __metadata$6('design:type', Boolean)
    ], DynamicFormOption.prototype, "disabled", void 0);
    __decorate$6([
        serializable(), 
        __metadata$6('design:type', Object)
    ], DynamicFormOption.prototype, "label", void 0);
    __decorate$6([
        serializable(), 
        __metadata$6('design:type', Object)
    ], DynamicFormOption.prototype, "value", void 0);
    return DynamicFormOption;
}());
var DynamicOptionControlModel = (function (_super) {
    __extends$5(DynamicOptionControlModel, _super);
    function DynamicOptionControlModel(config, cls) {
        _super.call(this, config, cls);
        this.options = config.options ? config.options.map(function (optionConfig) { return new DynamicFormOption(optionConfig); }) : [];
    }
    __decorate$6([
        serializable(), 
        __metadata$6('design:type', Array)
    ], DynamicOptionControlModel.prototype, "options", void 0);
    return DynamicOptionControlModel;
}(DynamicFormValueControlModel));

var __extends$4 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$5 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";
var DynamicRadioGroupModel = (function (_super) {
    __extends$4(DynamicRadioGroupModel, _super);
    function DynamicRadioGroupModel(config, cls) {
        _super.call(this, config, cls);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
        this.legend = getValue(config, "legend", null);
    }
    __decorate$5([
        serializable(), 
        __metadata$5('design:type', Object)
    ], DynamicRadioGroupModel.prototype, "legend", void 0);
    __decorate$5([
        serializable(), 
        __metadata$5('design:type', String)
    ], DynamicRadioGroupModel.prototype, "type", void 0);
    return DynamicRadioGroupModel;
}(DynamicOptionControlModel));

var __extends$6 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$7 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_SWITCH = "SWITCH";
var DynamicSwitchModel = (function (_super) {
    __extends$6(DynamicSwitchModel, _super);
    function DynamicSwitchModel(config, cls) {
        _super.call(this, config, cls);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_SWITCH;
        if (this.value !== true) {
            this.value = false;
        }
    }
    __decorate$7([
        serializable(), 
        __metadata$7('design:type', String)
    ], DynamicSwitchModel.prototype, "type", void 0);
    return DynamicSwitchModel;
}(DynamicFormValueControlModel));

var AUTOCOMPLETE_OFF = "off";
var AUTOCOMPLETE_ON = "on";
var AUTOFILL_TOKEN_BILLING = "billing";
var AUTOFILL_TOKEN_SHIPPING = "shipping";
var AUTOFILL_TOKENS_ADDRESS = [AUTOFILL_TOKEN_BILLING, AUTOFILL_TOKEN_SHIPPING];
var AUTOFILL_TOKEN_HOME = "home";
var AUTOFILL_TOKEN_WORK = "work";
var AUTOFILL_TOKEN_MOBILE = "mobile";
var AUTOFILL_TOKEN_FAX = "fax";
var AUTOFILL_TOKEN_PAGER = "pager";
var AUTOFILL_TOKENS_CONTACT = [
    AUTOFILL_TOKEN_FAX, AUTOFILL_TOKEN_HOME, AUTOFILL_TOKEN_MOBILE, AUTOFILL_TOKEN_PAGER, AUTOFILL_TOKEN_WORK
];
var AUTOFILL_FIELD_STREET_ADDRESS = "street-address";
var AUTOFILL_FIELD_ADDRESS_LINE_1 = "address-line1";
var AUTOFILL_FIELD_ADDRESS_LINE_2 = "address-line2";
var AUTOFILL_FIELD_ADDRESS_LINE_3 = "address-line3";
var AUTOFILL_FIELD_ADDRESS_LEVEL_4 = "address-level4";
var AUTOFILL_FIELD_ADDRESS_LEVEL_3 = "address-level3";
var AUTOFILL_FIELD_ADDRESS_LEVEL_2 = "address-level2";
var AUTOFILL_FIELD_ADDRESS_LEVEL_1 = "address-level1";
var AUTOFILL_FIELD_NAME = "name";
var AUTOFILL_FIELD_HONORIFIC_PREFIX = "honorific-prefix";
var AUTOFILL_FIELD_GIVEN_NAME = "given-name";
var AUTOFILL_FIELD_ADDITIONAL_NAME = "additional-name";
var AUTOFILL_FIELD_FAMILY_NAME = "family-name";
var AUTOFILL_FIELD_HONORIFIC_SUFFIX = "honorific-suffix";
var AUTOFILL_FIELD_NICKNAME = "nickname";
var AUTOFILL_FIELD_USERNAME = "username";
var AUTOFILL_FIELD_NEW_PASSWORD = "new-password";
var AUTOFILL_FIELD_CURRENT_PASSWORD = "current-password";
var AUTOFILL_FIELD_ORGANIZATION_TITLE = "organization-title";
var AUTOFILL_FIELD_ORGANIZATION = "organization";
var AUTOFILL_FIELD_COUNTRY = "country";
var AUTOFILL_FIELD_COUNTRY_NAME = "country-name";
var AUTOFILL_FIELD_POSTAL_CODE = "postal-code";
var AUTOFILL_FIELD_CC_NAME = "cc-name";
var AUTOFILL_FIELD_CC_GIVEN_NAME = "cc-given-name";
var AUTOFILL_FIELD_CC_ADDITIONAL_NAME = "cc-additional-name";
var AUTOFILL_FIELD_CC_FAMILY_NAME = "cc-family-name";
var AUTOFILL_FIELD_CC_NUMBER = "cc-number";
var AUTOFILL_FIELD_CC_EXP = "cc-exp";
var AUTOFILL_FIELD_CC_EXP_MONTH = "cc-exp-month";
var AUTOFILL_FIELD_CC_EXP_YEAR = "cc-exp-year";
var AUTOFILL_FIELD_CC_CSC = "cc-csc";
var AUTOFILL_FIELD_CC_TYPE = "cc-type";
var AUTOFILL_FIELD_TRANSACTION_CURRENCY = "transaction-currency";
var AUTOFILL_FIELD_TRANSACTION_AMOUNT = "transaction-amount";
var AUTOFILL_FIELD_LANGUAGE = "language";
var AUTOFILL_FIELD_BDAY = "bday";
var AUTOFILL_FIELD_BDAY_DAY = "bday-day";
var AUTOFILL_FIELD_BDAY_MONTH = "bday-month";
var AUTOFILL_FIELD_BDAY_YEAR = "bday-year";
var AUTOFILL_FIELD_SEX = "sex";
var AUTOFILL_FIELD_URL = "url";
var AUTOFILL_FIELD_PHOTO = "photo";
var AUTOFILL_FIELDS = [
    AUTOFILL_FIELD_STREET_ADDRESS, AUTOFILL_FIELD_ADDRESS_LINE_1, AUTOFILL_FIELD_ADDRESS_LINE_2,
    AUTOFILL_FIELD_ADDRESS_LINE_3, AUTOFILL_FIELD_ADDRESS_LEVEL_4, AUTOFILL_FIELD_ADDRESS_LEVEL_3,
    AUTOFILL_FIELD_ADDRESS_LEVEL_2, AUTOFILL_FIELD_ADDRESS_LEVEL_1, AUTOFILL_FIELD_NAME,
    AUTOFILL_FIELD_HONORIFIC_PREFIX, AUTOFILL_FIELD_GIVEN_NAME, AUTOFILL_FIELD_ADDITIONAL_NAME,
    AUTOFILL_FIELD_FAMILY_NAME, AUTOFILL_FIELD_HONORIFIC_SUFFIX, AUTOFILL_FIELD_NICKNAME, AUTOFILL_FIELD_USERNAME,
    AUTOFILL_FIELD_NEW_PASSWORD, AUTOFILL_FIELD_CURRENT_PASSWORD, AUTOFILL_FIELD_ORGANIZATION_TITLE,
    AUTOFILL_FIELD_ORGANIZATION, AUTOFILL_FIELD_COUNTRY, AUTOFILL_FIELD_COUNTRY_NAME, AUTOFILL_FIELD_POSTAL_CODE,
    AUTOFILL_FIELD_CC_NAME, AUTOFILL_FIELD_CC_GIVEN_NAME, AUTOFILL_FIELD_CC_ADDITIONAL_NAME,
    AUTOFILL_FIELD_CC_FAMILY_NAME, AUTOFILL_FIELD_CC_NUMBER, AUTOFILL_FIELD_CC_EXP, AUTOFILL_FIELD_CC_EXP_MONTH,
    AUTOFILL_FIELD_CC_EXP_YEAR, AUTOFILL_FIELD_CC_CSC, AUTOFILL_FIELD_CC_TYPE, AUTOFILL_FIELD_TRANSACTION_CURRENCY,
    AUTOFILL_FIELD_TRANSACTION_AMOUNT, AUTOFILL_FIELD_LANGUAGE, AUTOFILL_FIELD_BDAY, AUTOFILL_FIELD_BDAY_DAY,
    AUTOFILL_FIELD_BDAY_MONTH, AUTOFILL_FIELD_BDAY_YEAR, AUTOFILL_FIELD_SEX, AUTOFILL_FIELD_URL, AUTOFILL_FIELD_PHOTO
];
var AUTOFILL_FIELD_TEL = "tel";
var AUTOFILL_FIELD_TEL_COUNTRY_CODE = "tel-country-code";
var AUTOFILL_FIELD_TEL_NATIONAL = "tel-national";
var AUTOFILL_FIELD_TEL_AREA_CODE = "tel-area-code";
var AUTOFILL_FIELD_TEL_LOCAL = "tel-local";
var AUTOFILL_FIELD_TEL_LOCAL_PREFIX = "tel-local-prefix";
var AUTOFILL_FIELD_TEL_LOCAL_SUFFIX = "tel-local-suffix";
var AUTOFILL_FIELD_TEL_LOCAL_EXTENSION = "tel-extension";
var AUTOFILL_FIELD_EMAIL = "email";
var AUTOFILL_FIELD_IMPP = "impp";
var AUTOFILL_FIELDS_CONTACT = [
    AUTOFILL_FIELD_TEL, AUTOFILL_FIELD_TEL_COUNTRY_CODE, AUTOFILL_FIELD_TEL_NATIONAL, AUTOFILL_FIELD_TEL_AREA_CODE,
    AUTOFILL_FIELD_TEL_LOCAL, AUTOFILL_FIELD_TEL_LOCAL_PREFIX, AUTOFILL_FIELD_TEL_LOCAL_SUFFIX,
    AUTOFILL_FIELD_TEL_LOCAL_EXTENSION, AUTOFILL_FIELD_EMAIL, AUTOFILL_FIELD_IMPP
];
var DynamicFormAutoFillService = (function () {
    function DynamicFormAutoFillService() {
    }
    DynamicFormAutoFillService.prototype.isAddressToken = function (token) {
        return AUTOFILL_TOKENS_ADDRESS.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isContactField = function (token) {
        return AUTOFILL_FIELDS_CONTACT.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isContactToken = function (token) {
        return AUTOFILL_TOKENS_CONTACT.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isField = function (token) {
        return AUTOFILL_FIELDS.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isSectionToken = function (token) {
        return token.startsWith("section-");
    };
    DynamicFormAutoFillService.prototype.validate = function (tokens) {
        function toExpression(total, currentValue) {
            return total + "|" + currentValue;
        }
        var tokensAddress = AUTOFILL_TOKENS_ADDRESS.reduce(toExpression);
        var tokensContact = AUTOFILL_TOKENS_CONTACT.reduce(toExpression);
        var fields = AUTOFILL_FIELDS.reduce(toExpression);
        var fieldsContact = AUTOFILL_FIELDS_CONTACT.reduce(toExpression);
        var regex = new RegExp("^(section-\\w+\\s{1})?((" + tokensAddress + "){1}\\s)?((" + fields + "){1}|((" + tokensContact + "){1}\\s{1}(" + fieldsContact + ")))$");
        return regex.test(tokens);
    };
    return DynamicFormAutoFillService;
}());

var __extends$8 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$9 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicInputControlModel = (function (_super) {
    __extends$8(DynamicInputControlModel, _super);
    function DynamicInputControlModel(config, cls) {
        _super.call(this, config, cls);
        this.autoComplete = getValue(config, "autoComplete", AUTOCOMPLETE_ON);
        this.autoFocus = getValue(config, "autoFocus", false);
        this.maxLength = getValue(config, "maxLength", null);
        this.minLength = getValue(config, "minLength", null);
        this.placeholder = getValue(config, "placeholder", "");
        this.prefix = getValue(config, "prefix", null);
        this.readOnly = getValue(config, "readOnly", false);
        this.spellCheck = getValue(config, "spellCheck", false);
        this.suffix = getValue(config, "suffix", null);
    }
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "autoComplete", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "autoFocus", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Object)
    ], DynamicInputControlModel.prototype, "maxLength", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Object)
    ], DynamicInputControlModel.prototype, "minLength", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', String)
    ], DynamicInputControlModel.prototype, "placeholder", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Object)
    ], DynamicInputControlModel.prototype, "prefix", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "readOnly", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Boolean)
    ], DynamicInputControlModel.prototype, "spellCheck", void 0);
    __decorate$9([
        serializable(), 
        __metadata$9('design:type', Object)
    ], DynamicInputControlModel.prototype, "suffix", void 0);
    return DynamicInputControlModel;
}(DynamicFormValueControlModel));

var __extends$7 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$8 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = "file";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = "time";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";
var DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = "week";
var DynamicInputModel = (function (_super) {
    __extends$7(DynamicInputModel, _super);
    function DynamicInputModel(config, cls) {
        _super.call(this, config, cls);
        this.files = null;
        this.listId = null;
        this.type = DYNAMIC_FORM_CONTROL_TYPE_INPUT;
        this.accept = getValue(config, "accept", null);
        this.inputType = getValue(config, "inputType", DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
        this.list = getValue(config, "list", null);
        this.max = getValue(config, "max", null);
        this.min = getValue(config, "min", null);
        this.multiple = getValue(config, "multiple", null);
        this.pattern = getValue(config, "pattern", null);
        this.step = getValue(config, "step", null);
        if (this.list) {
            this.listId = this.id + "List";
        }
    }
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "accept", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', String)
    ], DynamicInputModel.prototype, "inputType", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "list", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "max", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "min", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "multiple", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "pattern", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', Object)
    ], DynamicInputModel.prototype, "step", void 0);
    __decorate$8([
        serializable(), 
        __metadata$8('design:type', String)
    ], DynamicInputModel.prototype, "type", void 0);
    return DynamicInputModel;
}(DynamicInputControlModel));

var DYNAMIC_FORM_CONTROL_ACTION_DISABLE = "DISABLE";
var DYNAMIC_FORM_CONTROL_ACTION_ENABLE = "ENABLE";
var DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = "AND";
var DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = "OR";
function findDisableRelation(relGroups) {
    return relGroups.find(function (rel) { return rel.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE; });
}
function findEnableRelation(relGroups) {
    return relGroups.find(function (rel) { return rel.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE; });
}
function findActivationRelation(relGroups) {
    return relGroups.find(function (rel) { return rel.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE || rel.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE; });
}
function findIds(relGroups) {
    var ids = [];
    relGroups.forEach(function (relGroup) { return relGroup.when.forEach(function (rel) {
        if (ids.indexOf(rel.id) === -1) {
            ids.push(rel.id);
        }
    }); });
    return ids;
}
function toBeDisabled(relGroup, formGroup) {
    return relGroup.when.reduce(function (toBeDisabled, rel, index) {
        var control = formGroup.get(rel.id);
        if (control && relGroup.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE) {
            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && !toBeDisabled) {
                return false;
            }
            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && toBeDisabled) {
                return true;
            }
            return rel.value === control.value || rel.status === control.status;
        }
        if (control && relGroup.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE) {
            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && toBeDisabled) {
                return true;
            }
            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && !toBeDisabled) {
                return false;
            }
            return !(rel.value === control.value || rel.status === control.status);
        }
        return false;
    }, false);
}

var DynamicFormControlComponent = (function () {
    function DynamicFormControlComponent() {
        this.hasErrorMessaging = false;
        this.subscriptions = [];
    }
    DynamicFormControlComponent.prototype.ngOnInit = function () {
        if (!isDefined(this.model)) {
            throw new Error("no model input defined for DynamicFormControlComponent");
        }
        if (!isDefined(this.controlGroup)) {
            throw new Error("no controlGroup input defined for DynamicFormControlComponent");
        }
        this.control = this.controlGroup.get(this.model.id);
        this.subscriptions.push(this.control.valueChanges.subscribe(this.onControlValueChanges.bind(this)));
        this.subscriptions.push(this.model.disabledUpdates.subscribe(this.onModelDisabledUpdates.bind(this)));
        if (this.model instanceof DynamicFormValueControlModel) {
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
            if (isDefined(this.model["errorMessages"])) {
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
            return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isCheckboxGroup", {
        get: function () {
            return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isRadioGroup", {
        get: function () {
            return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "isSwitch", {
        get: function () {
            return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_SWITCH;
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
        if (this.model.relation.length > 0 && findActivationRelation(this.model.relation)) {
            this.setControlActivationState();
            findIds(this.model.relation).forEach(function (controlId) {
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
        this.model.disabledUpdates.next(toBeDisabled(findActivationRelation(this.model.relation), this.controlGroup));
    };
    DynamicFormControlComponent.prototype.onControlValueChanges = function (value) {
        if (this.model instanceof DynamicFormValueControlModel) {
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
        if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {
            var inputModel = this.model;
            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
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

var __decorate$10 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicIdDirective = (function () {
    function DynamicIdDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    DynamicIdDirective.prototype.ngOnInit = function () {
        if (this.dynamicId) {
            this.renderer.setElementAttribute(this.elementRef.nativeElement, "id", this.dynamicId);
        }
    };
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], DynamicIdDirective.prototype, "dynamicId", void 0);
    DynamicIdDirective = __decorate$10([
        _angular_core.Directive({
            selector: "[dynamicId]"
        }), 
        __metadata$10('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], DynamicIdDirective);
    return DynamicIdDirective;
}());

var __extends$9 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$11 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DynamicFormArrayGroupModel = (function () {
    function DynamicFormArrayGroupModel(context, group, index) {
        if (group === void 0) { group = []; }
        if (index === void 0) { index = null; }
        this.context = context;
        this.group = group;
        this.index = index;
    }
    DynamicFormArrayGroupModel.prototype.toJSON = function () {
        return serialize(this);
    };
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Array)
    ], DynamicFormArrayGroupModel.prototype, "group", void 0);
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Object)
    ], DynamicFormArrayGroupModel.prototype, "index", void 0);
    return DynamicFormArrayGroupModel;
}());
var DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";
var DynamicFormArrayModel = (function (_super) {
    __extends$9(DynamicFormArrayModel, _super);
    function DynamicFormArrayModel(config, cls) {
        var _this = this;
        _super.call(this, config, cls);
        this.groups = [];
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
        if (!isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }
        this.asyncValidator = getValue(config, "asyncValidator", null);
        this.createGroup = config["createGroup"];
        this.initialCount = getValue(config, "initialCount", 1);
        this.originGroup = this.createGroup();
        this.validator = getValue(config, "validator", null);
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
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Object)
    ], DynamicFormArrayModel.prototype, "asyncValidator", void 0);
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Array)
    ], DynamicFormArrayModel.prototype, "groups", void 0);
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Number)
    ], DynamicFormArrayModel.prototype, "initialCount", void 0);
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Object)
    ], DynamicFormArrayModel.prototype, "validator", void 0);
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', String)
    ], DynamicFormArrayModel.prototype, "type", void 0);
    __decorate$11([
        serializable(), 
        __metadata$11('design:type', Array)
    ], DynamicFormArrayModel.prototype, "originGroup", void 0);
    return DynamicFormArrayModel;
}(DynamicFormControlModel));

var __extends$10 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$12 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";
var DynamicSelectModel = (function (_super) {
    __extends$10(DynamicSelectModel, _super);
    function DynamicSelectModel(config, cls) {
        _super.call(this, config, cls);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_SELECT;
    }
    __decorate$12([
        serializable(), 
        __metadata$12('design:type', String)
    ], DynamicSelectModel.prototype, "type", void 0);
    return DynamicSelectModel;
}(DynamicOptionControlModel));

var __extends$11 = (window && window.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$13 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";
var DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
var DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";
var DynamicTextAreaModel = (function (_super) {
    __extends$11(DynamicTextAreaModel, _super);
    function DynamicTextAreaModel(config, cls) {
        _super.call(this, config, cls);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        this.cols = getValue(config, "cols", 20);
        this.rows = getValue(config, "rows", 2);
        this.wrap = getValue(config, "wrap", DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
    }
    __decorate$13([
        serializable(), 
        __metadata$13('design:type', Number)
    ], DynamicTextAreaModel.prototype, "cols", void 0);
    __decorate$13([
        serializable(), 
        __metadata$13('design:type', Number)
    ], DynamicTextAreaModel.prototype, "rows", void 0);
    __decorate$13([
        serializable(), 
        __metadata$13('design:type', String)
    ], DynamicTextAreaModel.prototype, "wrap", void 0);
    __decorate$13([
        serializable(), 
        __metadata$13('design:type', String)
    ], DynamicTextAreaModel.prototype, "type", void 0);
    return DynamicTextAreaModel;
}(DynamicInputControlModel));

var __decorate$14 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
            if (model.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {
                var arrayModel = model;
                formGroup[model.id] = _this.createFormArray(arrayModel);
            }
            else if (model.type === DYNAMIC_FORM_CONTROL_TYPE_GROUP || model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {
                var groupModel = model, groupExtra_1 = { validator: groupModel.validator, asyncValidator: groupModel.asyncValidator };
                formGroup[model.id] = _this.createFormGroup(groupModel.group, groupExtra_1);
            }
            else {
                var controlModel = model;
                formGroup[controlModel.id] = new _angular_forms.FormControl({ value: controlModel.value, disabled: controlModel.disabled }, _angular_forms.Validators.compose(controlModel.validators), _angular_forms.Validators.composeAsync(controlModel.asyncValidators));
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
                object[prop] = deserializeValidator(object[prop]);
            });
            ["asyncValidators", "validators"].forEach(function (prop) {
                if (Array.isArray(object[prop])) {
                    object[prop] = deserializeValidators(object[prop]);
                }
            });
            switch (object["type"]) {
                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    object["groups"].forEach(function (groupObject) { return groupObject["group"] = _this.fromJSON(groupObject["group"]); });
                    object["createGroup"] = function () { return _this.fromJSON(object["originGroup"]); };
                    formModel.push(new DynamicFormArrayModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    formModel.push(new DynamicCheckboxModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    object["group"] = _this.fromJSON(object["group"]);
                    formModel.push(new DynamicCheckboxGroupModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    object["group"] = _this.fromJSON(object["group"]);
                    formModel.push(new DynamicFormGroupModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    formModel.push(new DynamicInputModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    formModel.push(new DynamicRadioGroupModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    formModel.push(new DynamicSelectModel(object, object["cls"]));
                    break;
                case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    formModel.push(new DynamicTextAreaModel(object, object["cls"]));
                    break;
                default:
                    throw new Error("unknown form control type defined on JSON object");
            }
        });
        return formModel;
    };
    DynamicFormService = __decorate$14([
        _angular_core.Injectable(), 
        __metadata$14('design:paramtypes', [_angular_forms.FormBuilder])
    ], DynamicFormService);
    return DynamicFormService;
}());

var __decorate$15 = (window && window.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (window && window.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (window && window.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DynamicFormsCoreModule = (function () {
    function DynamicFormsCoreModule(parentModule) {
        if (parentModule) {
            throw new Error("DynamicFormsCoreModule should only be imported in the root NgModule of the application!");
        }
    }
    DynamicFormsCoreModule.forRoot = function () {
        return {
            ngModule: DynamicFormsCoreModule,
            providers: [DynamicFormService, DynamicFormAutoFillService]
        };
    };
    DynamicFormsCoreModule = __decorate$15([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                _angular_forms.ReactiveFormsModule,
            ],
            declarations: [DynamicIdDirective],
            exports: [DynamicIdDirective]
        }),
        __param(0, _angular_core.Optional()),
        __param(0, _angular_core.SkipSelf()), 
        __metadata$15('design:paramtypes', [DynamicFormsCoreModule])
    ], DynamicFormsCoreModule);
    return DynamicFormsCoreModule;
}());

exports.DynamicFormControlComponent = DynamicFormControlComponent;
exports.DynamicIdDirective = DynamicIdDirective;
exports.METADATA_KEY_SERIALIZABLE = METADATA_KEY_SERIALIZABLE;
exports.serializable = serializable;
exports.getSerializables = getSerializables;
exports.DynamicFormControlModel = DynamicFormControlModel;
exports.DynamicFormValueControlModel = DynamicFormValueControlModel;
exports.DynamicInputControlModel = DynamicInputControlModel;
exports.DynamicFormOption = DynamicFormOption;
exports.DynamicOptionControlModel = DynamicOptionControlModel;
exports.DYNAMIC_FORM_CONTROL_ACTION_DISABLE = DYNAMIC_FORM_CONTROL_ACTION_DISABLE;
exports.DYNAMIC_FORM_CONTROL_ACTION_ENABLE = DYNAMIC_FORM_CONTROL_ACTION_ENABLE;
exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = DYNAMIC_FORM_CONTROL_CONNECTIVE_AND;
exports.DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = DYNAMIC_FORM_CONTROL_CONNECTIVE_OR;
exports.findDisableRelation = findDisableRelation;
exports.findEnableRelation = findEnableRelation;
exports.findActivationRelation = findActivationRelation;
exports.findIds = findIds;
exports.toBeDisabled = toBeDisabled;
exports.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
exports.DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START = DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START;
exports.DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_END = DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_END;
exports.DynamicCheckboxModel = DynamicCheckboxModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
exports.DynamicCheckboxGroupModel = DynamicCheckboxGroupModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_GROUP = DYNAMIC_FORM_CONTROL_TYPE_GROUP;
exports.DynamicFormGroupModel = DynamicFormGroupModel;
exports.DynamicFormArrayGroupModel = DynamicFormArrayGroupModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_ARRAY = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
exports.DynamicFormArrayModel = DynamicFormArrayModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_INPUT = DYNAMIC_FORM_CONTROL_TYPE_INPUT;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL;
exports.DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK;
exports.DynamicInputModel = DynamicInputModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
exports.DynamicRadioGroupModel = DynamicRadioGroupModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_SELECT = DYNAMIC_FORM_CONTROL_TYPE_SELECT;
exports.DynamicSelectModel = DynamicSelectModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_SWITCH = DYNAMIC_FORM_CONTROL_TYPE_SWITCH;
exports.DynamicSwitchModel = DynamicSwitchModel;
exports.DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
exports.DYNAMIC_FORM_TEXTAREA_WRAP_HARD = DYNAMIC_FORM_TEXTAREA_WRAP_HARD;
exports.DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = DYNAMIC_FORM_TEXTAREA_WRAP_SOFT;
exports.DynamicTextAreaModel = DynamicTextAreaModel;
exports.DynamicFormService = DynamicFormService;
exports.AUTOCOMPLETE_OFF = AUTOCOMPLETE_OFF;
exports.AUTOCOMPLETE_ON = AUTOCOMPLETE_ON;
exports.AUTOFILL_TOKEN_BILLING = AUTOFILL_TOKEN_BILLING;
exports.AUTOFILL_TOKEN_SHIPPING = AUTOFILL_TOKEN_SHIPPING;
exports.AUTOFILL_TOKENS_ADDRESS = AUTOFILL_TOKENS_ADDRESS;
exports.AUTOFILL_TOKEN_HOME = AUTOFILL_TOKEN_HOME;
exports.AUTOFILL_TOKEN_WORK = AUTOFILL_TOKEN_WORK;
exports.AUTOFILL_TOKEN_MOBILE = AUTOFILL_TOKEN_MOBILE;
exports.AUTOFILL_TOKEN_FAX = AUTOFILL_TOKEN_FAX;
exports.AUTOFILL_TOKEN_PAGER = AUTOFILL_TOKEN_PAGER;
exports.AUTOFILL_TOKENS_CONTACT = AUTOFILL_TOKENS_CONTACT;
exports.AUTOFILL_FIELD_STREET_ADDRESS = AUTOFILL_FIELD_STREET_ADDRESS;
exports.AUTOFILL_FIELD_ADDRESS_LINE_1 = AUTOFILL_FIELD_ADDRESS_LINE_1;
exports.AUTOFILL_FIELD_ADDRESS_LINE_2 = AUTOFILL_FIELD_ADDRESS_LINE_2;
exports.AUTOFILL_FIELD_ADDRESS_LINE_3 = AUTOFILL_FIELD_ADDRESS_LINE_3;
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_4 = AUTOFILL_FIELD_ADDRESS_LEVEL_4;
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_3 = AUTOFILL_FIELD_ADDRESS_LEVEL_3;
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_2 = AUTOFILL_FIELD_ADDRESS_LEVEL_2;
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_1 = AUTOFILL_FIELD_ADDRESS_LEVEL_1;
exports.AUTOFILL_FIELD_NAME = AUTOFILL_FIELD_NAME;
exports.AUTOFILL_FIELD_HONORIFIC_PREFIX = AUTOFILL_FIELD_HONORIFIC_PREFIX;
exports.AUTOFILL_FIELD_GIVEN_NAME = AUTOFILL_FIELD_GIVEN_NAME;
exports.AUTOFILL_FIELD_ADDITIONAL_NAME = AUTOFILL_FIELD_ADDITIONAL_NAME;
exports.AUTOFILL_FIELD_FAMILY_NAME = AUTOFILL_FIELD_FAMILY_NAME;
exports.AUTOFILL_FIELD_HONORIFIC_SUFFIX = AUTOFILL_FIELD_HONORIFIC_SUFFIX;
exports.AUTOFILL_FIELD_NICKNAME = AUTOFILL_FIELD_NICKNAME;
exports.AUTOFILL_FIELD_USERNAME = AUTOFILL_FIELD_USERNAME;
exports.AUTOFILL_FIELD_NEW_PASSWORD = AUTOFILL_FIELD_NEW_PASSWORD;
exports.AUTOFILL_FIELD_CURRENT_PASSWORD = AUTOFILL_FIELD_CURRENT_PASSWORD;
exports.AUTOFILL_FIELD_ORGANIZATION_TITLE = AUTOFILL_FIELD_ORGANIZATION_TITLE;
exports.AUTOFILL_FIELD_ORGANIZATION = AUTOFILL_FIELD_ORGANIZATION;
exports.AUTOFILL_FIELD_COUNTRY = AUTOFILL_FIELD_COUNTRY;
exports.AUTOFILL_FIELD_COUNTRY_NAME = AUTOFILL_FIELD_COUNTRY_NAME;
exports.AUTOFILL_FIELD_POSTAL_CODE = AUTOFILL_FIELD_POSTAL_CODE;
exports.AUTOFILL_FIELD_CC_NAME = AUTOFILL_FIELD_CC_NAME;
exports.AUTOFILL_FIELD_CC_GIVEN_NAME = AUTOFILL_FIELD_CC_GIVEN_NAME;
exports.AUTOFILL_FIELD_CC_ADDITIONAL_NAME = AUTOFILL_FIELD_CC_ADDITIONAL_NAME;
exports.AUTOFILL_FIELD_CC_FAMILY_NAME = AUTOFILL_FIELD_CC_FAMILY_NAME;
exports.AUTOFILL_FIELD_CC_NUMBER = AUTOFILL_FIELD_CC_NUMBER;
exports.AUTOFILL_FIELD_CC_EXP = AUTOFILL_FIELD_CC_EXP;
exports.AUTOFILL_FIELD_CC_EXP_MONTH = AUTOFILL_FIELD_CC_EXP_MONTH;
exports.AUTOFILL_FIELD_CC_EXP_YEAR = AUTOFILL_FIELD_CC_EXP_YEAR;
exports.AUTOFILL_FIELD_CC_CSC = AUTOFILL_FIELD_CC_CSC;
exports.AUTOFILL_FIELD_CC_TYPE = AUTOFILL_FIELD_CC_TYPE;
exports.AUTOFILL_FIELD_TRANSACTION_CURRENCY = AUTOFILL_FIELD_TRANSACTION_CURRENCY;
exports.AUTOFILL_FIELD_TRANSACTION_AMOUNT = AUTOFILL_FIELD_TRANSACTION_AMOUNT;
exports.AUTOFILL_FIELD_LANGUAGE = AUTOFILL_FIELD_LANGUAGE;
exports.AUTOFILL_FIELD_BDAY = AUTOFILL_FIELD_BDAY;
exports.AUTOFILL_FIELD_BDAY_DAY = AUTOFILL_FIELD_BDAY_DAY;
exports.AUTOFILL_FIELD_BDAY_MONTH = AUTOFILL_FIELD_BDAY_MONTH;
exports.AUTOFILL_FIELD_BDAY_YEAR = AUTOFILL_FIELD_BDAY_YEAR;
exports.AUTOFILL_FIELD_SEX = AUTOFILL_FIELD_SEX;
exports.AUTOFILL_FIELD_URL = AUTOFILL_FIELD_URL;
exports.AUTOFILL_FIELD_PHOTO = AUTOFILL_FIELD_PHOTO;
exports.AUTOFILL_FIELDS = AUTOFILL_FIELDS;
exports.AUTOFILL_FIELD_TEL = AUTOFILL_FIELD_TEL;
exports.AUTOFILL_FIELD_TEL_COUNTRY_CODE = AUTOFILL_FIELD_TEL_COUNTRY_CODE;
exports.AUTOFILL_FIELD_TEL_NATIONAL = AUTOFILL_FIELD_TEL_NATIONAL;
exports.AUTOFILL_FIELD_TEL_AREA_CODE = AUTOFILL_FIELD_TEL_AREA_CODE;
exports.AUTOFILL_FIELD_TEL_LOCAL = AUTOFILL_FIELD_TEL_LOCAL;
exports.AUTOFILL_FIELD_TEL_LOCAL_PREFIX = AUTOFILL_FIELD_TEL_LOCAL_PREFIX;
exports.AUTOFILL_FIELD_TEL_LOCAL_SUFFIX = AUTOFILL_FIELD_TEL_LOCAL_SUFFIX;
exports.AUTOFILL_FIELD_TEL_LOCAL_EXTENSION = AUTOFILL_FIELD_TEL_LOCAL_EXTENSION;
exports.AUTOFILL_FIELD_EMAIL = AUTOFILL_FIELD_EMAIL;
exports.AUTOFILL_FIELD_IMPP = AUTOFILL_FIELD_IMPP;
exports.AUTOFILL_FIELDS_CONTACT = AUTOFILL_FIELDS_CONTACT;
exports.DynamicFormAutoFillService = DynamicFormAutoFillService;
exports.DynamicFormsCoreModule = DynamicFormsCoreModule;
exports.isDefined = isDefined;
exports.isEmptyString = isEmptyString;
exports.isFunction = isFunction;
exports.getValue = getValue;
exports.serializeValidator = serializeValidator;
exports.serializeValidators = serializeValidators;
exports.deserializeValidator = deserializeValidator;
exports.deserializeValidators = deserializeValidators;
exports.serialize = serialize;

Object.defineProperty(exports, '__esModule', { value: true });

})));
