import { QueryList } from "@angular/core";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormControl } from "./dynamic-form-control.interface";

export interface DynamicTemplateableFormControl extends DynamicFormControl {

    readonly templateDirectives: Map<string, string>;

    templateableViewChild: any;

    templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];
}