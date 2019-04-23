export const STATE_DISABLED = "DISABLED";
export const STATE_ENABLED = "ENABLED";
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

    state: string;
    operator?: string;
    when: DynamicFormControlCondition[];
}
