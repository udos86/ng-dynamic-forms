import { DynamicFormControl } from "./dynamic-form-control.interface";

export interface DynamicTemplateableFormControl extends DynamicFormControl {

    readonly templateDirectives: Map<string, string>;

    viewChild: any;
}