import {AsyncValidatorFn, Validators, ValidatorFn} from "@angular/forms";
import {getSerializables, SerializableProperty} from "./decorator/serializable.decorator";

export function isBoolean(object: any): boolean {
    return typeof object === "boolean";
}

export function isDefined(object: any): boolean {
    return object !== undefined && object !== null;
}

export function isEmptyString(_string: string | null | undefined): boolean {
    return typeof _string !== "string" || _string.length === 0;
}

export function isFunction(object: any): boolean {
    return typeof object === "function";
}

export function getValue(object: any, key: string, defaultValue: any): any {

    if (object === undefined || object === null) {
        return defaultValue;
    }

    let value = object[key];

    if (value === undefined && defaultValue !== undefined) {
        return defaultValue;
    }

    if (typeof value === "object" && typeof defaultValue === "object") {

        for (let property in value) {

            if (value.hasOwnProperty(property) && typeof value[property] === "object") {

                value[property] = getValue(value, property, defaultValue ? defaultValue[property] : null);
            }
        }

        return defaultValue ? Object.assign(defaultValue, value) : value;
    }

    return value;
}


export function serializeValidator(validator: ValidatorFn | AsyncValidatorFn): string | null {

    for (let validatorName in Validators) {

        if (Validators.hasOwnProperty(validatorName) && validator === Validators[validatorName]) {
            return validatorName;
        }
    }

    return null;
}

export function serializeValidators(validators: Array<ValidatorFn | AsyncValidatorFn>): Array<string> {

    let serialized = [];

    validators.forEach(validator => {

        let validatorName = serializeValidator(validator);

        if (validatorName) {
            serialized.push(validatorName);
        }
    });

    return serialized;
}

export function deserializeValidator(serialized: string): ValidatorFn | AsyncValidatorFn {

    return Validators[serialized];
}

export function deserializeValidators(serialized: Array<string>): Array<ValidatorFn | AsyncValidatorFn> {

    return serialized.map(validatorName => deserializeValidator(validatorName));
}

export function serialize(target, prototype?): Object {

    return getSerializables(prototype || target).reduce((prev, prop: SerializableProperty) => {

        if (prop.key === "validators" || prop.key === "asyncValidators") {

            prev[prop.name] = serializeValidators(target[prop.key]);

        } else if (prop.key === "validator" || prop.key === "asyncValidator") {

            prev[prop.name] = serializeValidator(target[prop.key]);

        } else {
            prev[prop.name] = target[prop.key];
        }

        return prev;

    }, {});
}