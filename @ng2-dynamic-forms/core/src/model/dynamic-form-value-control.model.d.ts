/// <reference types="core-js" />
import { ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import { DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig } from "./dynamic-form-control.model";
export interface DynamicFormValueControlModelConfig extends DynamicFormControlModelConfig {
    asyncValidators?: Array<AsyncValidatorFn>;
    errorMessages?: {
        [key: string]: string;
    };
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    validators?: Array<ValidatorFn>;
    value?: boolean | number | string;
}
export declare abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {
    asyncValidators: Array<AsyncValidatorFn>;
    errorMessages: {
        [key: string]: string;
    } | null;
    hint: string | null;
    required: boolean;
    tabIndex: number | null;
    validators: Array<ValidatorFn>;
    _value: T | null;
    valueUpdates: Subject<T>;
    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig);
    value: T;
    readonly hasErrorMessages: boolean;
}
