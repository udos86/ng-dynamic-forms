import { DynamicFormControlValue } from "../dynamic-form-value-control.model";

export const DYNAMIC_FORM_CONTROL_ACTION_DISABLE = "DISABLE";
export const DYNAMIC_FORM_CONTROL_ACTION_ENABLE = "ENABLE";
export const DYNAMIC_FORM_CONTROL_ACTION_VISIBLE = "VISIBLE";
export const DYNAMIC_FORM_CONTROL_ACTION_HIDDEN = "HIDDEN";

export const DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = "AND";
export const DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = "OR";

export interface DynamicFormControlRelation {

    id: string;
    status?: string;
    value?: DynamicFormControlValue;
}

export interface DynamicFormControlRelationGroup {

    action: string;
    connective?: string;
    when: DynamicFormControlRelation[];
}