export interface DynamicFormControlCondition {
    id?: string;
    rootPath?: string;
    status?: string;
    value?: any;
    matched?: (relatedFormControlValue: any) => boolean; // Has precedence over value
}

export interface DynamicFormControlRelation {
    match: string;
    operator?: string;
    when: DynamicFormControlCondition[];
}
