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
