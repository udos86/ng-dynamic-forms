/// <reference types="core-js" />
import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormGroupModel, DynamicFormGroupModelConfig } from "../form-group/dynamic-form-group.model";
import { DynamicCheckboxModel } from "./dynamic-checkbox.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP: string;
export declare class DynamicCheckboxGroupModel extends DynamicFormGroupModel {
    group: Array<DynamicCheckboxModel>;
    readonly type: string;
    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig);
}
