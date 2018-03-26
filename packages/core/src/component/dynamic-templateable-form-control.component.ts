import { AfterViewInit, QueryList, TemplateRef } from "@angular/core";
import { DynamicTemplateableFormControl } from "./dynamic-templateable-form-control.interface";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormControlComponent } from "./dynamic-form-control.component";

export abstract class DynamicTemplateableFormControlComponent extends DynamicFormControlComponent implements DynamicTemplateableFormControl, AfterViewInit {

    readonly templateDirectives: Map<string, string>;

    templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    ngAfterViewInit() {
        this.bindTemplates();
    }

    abstract get templateableViewChild(): any;

    abstract mapTemplate(template: DynamicTemplateDirective): DynamicTemplateDirective | TemplateRef<any>;

    bindTemplate(template: DynamicTemplateDirective) {

        if ((template.modelId === this.model.id || template.modelType === this.model.type)) {

            if (typeof template.as === "string" && this.templateDirectives.has(template.as)) {

                let property = this.templateDirectives.get(template.as) as string;

                this.templateableViewChild[property] = this.mapTemplate(template);
            }
        }
    }

    bindTemplates(): void {

        if (this.templates instanceof QueryList) {
            this.templates.forEach(template => this.bindTemplate(template));

        } else if (Array.isArray(this.templates)) {
            this.templates.forEach(template => this.bindTemplate(template));
        }
    }
}