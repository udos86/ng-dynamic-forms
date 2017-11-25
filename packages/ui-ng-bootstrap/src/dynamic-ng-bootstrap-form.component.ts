import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormService,
    DynamicTemplateDirective,
} from "@ng-dynamic-forms/core";
import { DynamicNGBootstrapFormControlComponent } from "./dynamic-ng-bootstrap-form-control.component";

@Component({
    selector: "dynamic-ng-bootstrap-form",
    templateUrl: "./dynamic-ng-bootstrap-form.component.html"
})
export class DynamicNGBootstrapFormComponent extends DynamicFormComponent {

    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel[];
    @Input() layout: DynamicFormLayout;

    @Output("dfBlur") blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dfChange") change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("dfFocus") focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicNGBootstrapFormControlComponent) components: QueryList<DynamicNGBootstrapFormControlComponent>;

    constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {
        super(formService, layoutService);
    }
}