import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "../dynamic-form-value-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX: string;
export declare const DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START: string;
export declare const DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_END: string;
export interface DynamicCheckboxModelConfig extends DynamicFormValueControlModelConfig {
    align?: string;
    indeterminate?: boolean;
}
export declare class DynamicCheckboxModel extends DynamicFormValueControlModel<boolean> {
    align: string;
    indeterminate: boolean;
    readonly type: string;
    constructor(config: DynamicCheckboxModelConfig, cls?: ClsConfig);
}
