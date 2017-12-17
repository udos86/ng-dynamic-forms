export interface DynamicValidatorDescriptor {

    name: string;
    args: any;
}

export function isValidatorDescriptor(value: any): boolean {

    if (value !== null && typeof value === "object") {
        return value.hasOwnProperty("name") && value.hasOwnProperty("args");
    }

    return false;
}

export type DynamicValidatorsConfig = { [validatorKey: string]: any | DynamicValidatorDescriptor };

