import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { QueryList } from "@angular/core";

export interface DynamicTemplateableFormControl {

    readonly templateDirectives: Map<string, string>;

    templateableViewChild: any;

    templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];
}