"use strict";
var forms_1 = require("@angular/forms");
var serializable_decorator_1 = require("./decorator/serializable.decorator");
function isDefined(object) {
    return object !== undefined && object !== null;
}
exports.isDefined = isDefined;
function isEmptyString(_string) {
    return typeof _string !== "string" || _string.length === 0;
}
exports.isEmptyString = isEmptyString;
function isFunction(object) {
    return typeof object === "function";
}
exports.isFunction = isFunction;
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
exports.getValue = getValue;
function serializeValidator(validator) {
    for (var validatorName in forms_1.Validators) {
        if (forms_1.Validators.hasOwnProperty(validatorName) && validator === forms_1.Validators[validatorName]) {
            return validatorName;
        }
    }
    return null;
}
exports.serializeValidator = serializeValidator;
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
exports.serializeValidators = serializeValidators;
function deserializeValidator(serialized) {
    return forms_1.Validators[serialized];
}
exports.deserializeValidator = deserializeValidator;
function deserializeValidators(serialized) {
    return serialized.map(function (validatorName) { return deserializeValidator(validatorName); });
}
exports.deserializeValidators = deserializeValidators;
function serialize(target, prototype) {
    return serializable_decorator_1.getSerializables(prototype || target).reduce(function (prev, prop) {
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
exports.serialize = serialize;

//# sourceMappingURL=utils.js.map
