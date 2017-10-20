export const FORM_HOOK_BLUR = "blur";
export const FORM_HOOK_CHANGE = "change";
export const FORM_HOOK_SUBMIT = "submit";

export const FORM_HOOKS = [FORM_HOOK_BLUR, FORM_HOOK_CHANGE, FORM_HOOK_SUBMIT];

export interface DynamicValidatorDescriptor {

    name: string;
    args: any;
}

export class ValidationUtils {

    static isDynamicValidatorDescriptor(value: any): boolean {

        if (value && typeof value === "object") {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }

        return false;
    }

    static isFormHook(value: any): boolean {
        return FORM_HOOKS.indexOf(value) !== -1;
    }
}