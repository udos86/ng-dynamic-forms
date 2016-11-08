/// <reference types="core-js" />
import { ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
export declare class DynamicFormArrayGroupModel {
    context: DynamicFormArrayModel;
    group: Array<DynamicFormValueControlModel<any>>;
    index: number | null;
    constructor(context: DynamicFormArrayModel, group?: Array<DynamicFormValueControlModel<any>>, index?: number | null);
    toJSON(): Object;
}
export declare const DYNAMIC_FORM_CONTROL_TYPE_ARRAY: string;
export interface DynamicFormArrayModelConfig extends DynamicFormControlModelConfig {
    asyncValidator?: AsyncValidatorFn;
    createGroup?: () => Array<DynamicFormValueControlModel<any>>;
    groups?: Array<DynamicFormArrayGroupModel>;
    initialCount?: number;
    validator?: ValidatorFn;
}
export declare class DynamicFormArrayModel extends DynamicFormControlModel {
    asyncValidator: AsyncValidatorFn | null;
    createGroup: () => Array<DynamicFormValueControlModel<any>>;
    groups: Array<DynamicFormArrayGroupModel>;
    initialCount: number;
    validator: ValidatorFn | null;
    readonly type: string;
    private originGroup;
    constructor(config: DynamicFormArrayModelConfig, cls?: ClsConfig);
    updateGroupIndex(): void;
    addGroup(): DynamicFormArrayGroupModel;
    insertGroup(index: number): DynamicFormArrayGroupModel;
    removeGroup(index: number): void;
}
