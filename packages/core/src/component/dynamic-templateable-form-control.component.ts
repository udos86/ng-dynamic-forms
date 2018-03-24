import { AfterViewInit, QueryList } from "@angular/core";
import { DynamicTemplateableFormControl } from "./dynamic-templateable-form-control.interface";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicFormLayoutService } from "../service/dynamic-form-layout.service";
import { DynamicFormControlComponent } from "./dynamic-form-control.component";

export abstract class DynamicTemplateableFormControlComponent extends DynamicFormControlComponent implements DynamicTemplateableFormControl, AfterViewInit {

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