import { AfterViewInit, QueryList } from "@angular/core";
import { DynamicTemplateableFormValueControl } from "./dynamic-templateable-form-value-control.interface";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicFormLayoutService } from "../service/dynamic-form-layout.service";
import { DynamicFormValueControlComponent } from "./dynamic-form-value-control.component";

export abstract class DynamicTemplateableFormValueControlComponent extends DynamicFormValueControlComponent implements DynamicTemplateableFormValueControl, AfterViewInit {

    readonly templateDirectives: Map<string, string>;

    templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    ngAfterViewInit() {

        this.bindTemplates();
    }

    bindTemplate(template: DynamicTemplateDirective) {

        if ((template.modelId === this.model.id || template.modelType === this.model.type)) {

            if (typeof template.as === "string" && this.templateDirectives.has(template.as)) {
                this.templateableViewChild[this.templateDirectives.get(template.as) as string] = template;
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

    abstract get templateableViewChild(): any;
}