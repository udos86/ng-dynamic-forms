import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { QueryList } from "@angular/core";

export interface DynamicTemplateableFormValueControl {

    readonly templateDirectives: string[];

    templateableViewChild: any;

    templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];
}