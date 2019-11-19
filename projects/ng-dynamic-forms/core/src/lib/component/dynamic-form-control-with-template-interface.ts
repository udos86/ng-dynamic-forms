import { DynamicFormControl } from "./dynamic-form-control-interface";

export interface DynamicFormControlWithTemplate extends DynamicFormControl {

    readonly templateDirectives: Map<string, string>;

    viewChild: any;
}
