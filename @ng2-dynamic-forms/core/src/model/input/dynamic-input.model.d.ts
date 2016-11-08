/// <reference types="core-js" />
import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_INPUT: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL: string;
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK: string;
export interface DynamicInputModelConfig extends DynamicInputControlModelConfig {
    accept?: string;
    inputType?: string;
    list?: Array<string>;
    max?: number;
    min?: number;
    multiple?: boolean;
    pattern?: string;
    step?: number;
}
export declare class DynamicInputModel extends DynamicInputControlModel<any> {
    accept: string | null;
    inputType: string;
    files: FileList | null;
    list: Array<string> | null;
    max: number | null;
    min: number | null;
    multiple: boolean | null;
    pattern: string | null;
    step: number | null;
    private listId;
    readonly type: string;
    constructor(config: DynamicInputModelConfig, cls?: ClsConfig);
}
