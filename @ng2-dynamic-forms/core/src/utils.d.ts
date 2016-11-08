/// <reference types="core-js" />
import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
export declare function isDefined(object: any): boolean;
export declare function isEmptyString(_string: string | null | undefined): boolean;
export declare function isFunction(object: any): boolean;
export declare function getValue(object: any, key: string, defaultValue: any): any;
export declare function serializeValidator(validator: ValidatorFn | AsyncValidatorFn): string | null;
export declare function serializeValidators(validators: Array<ValidatorFn | AsyncValidatorFn>): Array<string>;
export declare function deserializeValidator(serialized: string): ValidatorFn | AsyncValidatorFn;
export declare function deserializeValidators(serialized: Array<string>): Array<ValidatorFn | AsyncValidatorFn>;
export declare function serialize(target: any, prototype?: any): Object;
