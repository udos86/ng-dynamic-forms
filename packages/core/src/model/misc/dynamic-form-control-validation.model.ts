export interface DynamicValidatorDescriptor {

    name: string;
    args: any;
}

export type DynamicValidatorsConfig = { [validatorKey: string]: any | DynamicValidatorDescriptor };