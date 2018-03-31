import { QueryList } from "@angular/core";
import { DynamicFormControlComponent } from "./dynamic-form-control.component";
import { DynamicTemplateDirective, } from "../directive/dynamic-template.directive";
import { DynamicFormGroupModel } from "../model/form-group/dynamic-form-group.model";

export abstract class DynamicFormGroupComponent extends DynamicFormControlComponent {

    model: DynamicFormGroupModel;
    templates: QueryList<DynamicTemplateDirective> | undefined;
}