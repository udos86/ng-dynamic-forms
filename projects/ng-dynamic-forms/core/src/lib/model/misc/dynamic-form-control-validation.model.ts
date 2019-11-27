export interface DynamicValidatorDescriptor {
    name: string;
    args: any;
}

export type DynamicValidatorsConfig = { [validatorKey: string]: any | DynamicValidatorDescriptor };

export enum DynamicFormHook {
    Blur = "blur",
    Change = "change",
    Submit = "submit"
}
