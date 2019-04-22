export const DYNAMIC_FORM_CONTROL_STATE_DISABLED = "DISABLE";
export const DYNAMIC_FORM_CONTROL_STATE_ENABLED = "ENABLE";
export const DYNAMIC_FORM_CONTROL_STATE_VISIBLE = "VISIBLE";
export const DYNAMIC_FORM_CONTROL_STATE_HIDDEN = "HIDDEN";
export const DYNAMIC_FORM_CONTROL_STATE_REQUIRED = "REQUIRED";

export const DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_AND = "AND";
export const DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR = "OR";

export interface DynamicFormControlCondition {

    id: string;
    status?: string;
    value?: any;
}

export interface DynamicFormControlRelation {

    action: string;
    connective?: string;
    when: DynamicFormControlCondition[];
}
