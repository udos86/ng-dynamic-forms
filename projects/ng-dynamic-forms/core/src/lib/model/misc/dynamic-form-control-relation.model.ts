export const MATCH_DISABLED = "DISABLED";
export const MATCH_ENABLED = "ENABLED";
export const MATCH_HIDDEN = "HIDDEN";
export const MATCH_OPTIONAL = "OPTIONAL";
export const MATCH_REQUIRED = "REQUIRED";
export const MATCH_VISIBLE = "VISIBLE";

export const AND_OPERATOR = "AND";
export const OR_OPERATOR = "OR";

export interface DynamicFormControlCondition {

    id?: string;
    rootPath?: string;
    status?: string;
    value?: any;
}

export interface DynamicFormControlRelation {

    match: string;
    operator?: string;
    when: DynamicFormControlCondition[];
}
