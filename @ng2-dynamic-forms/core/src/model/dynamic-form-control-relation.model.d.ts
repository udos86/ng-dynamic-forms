/// <reference types="core-js" />
import { FormGroup } from "@angular/forms";
export declare const DYNAMIC_FORM_CONTROL_ACTION_DISABLE: string;
export declare const DYNAMIC_FORM_CONTROL_ACTION_ENABLE: string;
export declare const DYNAMIC_FORM_CONTROL_CONNECTIVE_AND: string;
export declare const DYNAMIC_FORM_CONTROL_CONNECTIVE_OR: string;
export interface DynamicFormControlRelation {
    id: string;
    value?: boolean | number | string;
    status?: string;
}
export interface DynamicFormControlRelationGroup {
    action: string;
    connective?: string;
    when: Array<DynamicFormControlRelation>;
}
export declare function findDisableRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup;
export declare function findEnableRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup;
export declare function findActivationRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup;
export declare function findIds(relGroups: Array<DynamicFormControlRelationGroup>): Array<string>;
export declare function toBeDisabled(relGroup: DynamicFormControlRelationGroup, formGroup: FormGroup): boolean;
