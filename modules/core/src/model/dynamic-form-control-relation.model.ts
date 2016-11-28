import {DynamicFormControlValue} from "./dynamic-form-value-control.model";

export const DYNAMIC_FORM_CONTROL_ACTION_DISABLE = "DISABLE";
export const DYNAMIC_FORM_CONTROL_ACTION_ENABLE = "ENABLE";

export const DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = "AND";
export const DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = "OR";

export interface DynamicFormControlRelation {

    id: string;
    value?: DynamicFormControlValue;
    status?: string;
}

export interface DynamicFormControlRelationGroup {

    action: string;
    connective?: string;
    when: Array<DynamicFormControlRelation>;
}