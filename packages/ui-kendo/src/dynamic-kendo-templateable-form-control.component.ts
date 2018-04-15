import { TemplateRef } from "@angular/core";
import { DynamicTemplateableFormControlComponent, DynamicTemplateDirective } from "@ng-dynamic-forms/core";

export abstract class DynamicKendoTemplateableFormControlComponent extends DynamicTemplateableFormControlComponent {

    mapTemplate(template: DynamicTemplateDirective): DynamicTemplateDirective | TemplateRef<any> {
        return template;
    }
}