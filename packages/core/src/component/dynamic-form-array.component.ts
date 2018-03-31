import { QueryList } from "@angular/core";
import { DynamicFormControlComponent } from "./dynamic-form-control.component";
import {
    DynamicTemplateDirective,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END,
    DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START
} from "../directive/dynamic-template.directive";
import { DynamicFormArrayModel } from "../model/form-array/dynamic-form-array.model";

export abstract class DynamicFormArrayComponent extends DynamicFormControlComponent {

    model: DynamicFormArrayModel;
    templates: QueryList<DynamicTemplateDirective> | undefined;

    get startTemplate(): DynamicTemplateDirective | undefined {

        return this.layoutService
            .filterTemplates(this.model, this.templates)
            .find(template => template.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_START);
    }

    get endTemplate(): DynamicTemplateDirective | undefined {

        return this.layoutService
            .filterTemplates(this.model, this.templates)
            .find(template => template.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END);
    }
}