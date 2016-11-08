/// <reference types="core-js" />
import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
export interface DynamicFormOptionConfig {
    disabled?: boolean;
    label?: string;
    value: boolean | number | string;
}
export declare class DynamicFormOption {
    disabled: boolean;
    label: string | null;
    value: boolean | number | string;
    constructor(config: DynamicFormOptionConfig);
    text: string;
    toJSON(): Object;
}
export interface DynamicOptionControlModelConfig extends DynamicFormValueControlModelConfig {
    options?: Array<DynamicFormOptionConfig>;
}
export declare abstract class DynamicOptionControlModel<T> extends DynamicFormValueControlModel<T> {
    options: Array<DynamicFormOption>;
    constructor(config: DynamicOptionControlModelConfig, cls?: ClsConfig);
}
