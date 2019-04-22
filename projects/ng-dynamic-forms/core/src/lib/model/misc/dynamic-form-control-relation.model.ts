export const STATE_DISABLED = "DISABLE";
export const STATE_ENABLED = "ENABLE";
export const STATE_HIDDEN = "HIDDEN";
export const STATE_VISIBLE = "VISIBLE";
export const STATE_REQUIRED = "REQUIRED";
export const STATE_OPTIONAL = "OPTIONAL";

export const AND_OPERATOR = "AND";
export const OR_OPERATOR = "OR";

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
