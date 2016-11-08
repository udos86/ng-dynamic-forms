/// <reference types="core-js" />
import { ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig } from "../dynamic-form-control.model";
export interface DynamicFieldSet {
    legend: string | null;
}
export declare const DYNAMIC_FORM_CONTROL_TYPE_GROUP: string;
export interface DynamicFormGroupModelConfig extends DynamicFormControlModelConfig {
    asyncValidator?: AsyncValidatorFn;
    group?: Array<DynamicFormControlModel>;
    legend?: string;
    validator?: ValidatorFn;
}
export declare class DynamicFormGroupModel extends DynamicFormControlModel implements DynamicFieldSet {
    asyncValidator: AsyncValidatorFn | null;
    group: Array<DynamicFormControlModel>;
    legend: string | null;
    validator: ValidatorFn | null;
    readonly type: string;
    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig);
}
