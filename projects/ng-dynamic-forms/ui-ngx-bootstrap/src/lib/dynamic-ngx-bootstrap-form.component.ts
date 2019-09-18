import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormComponent,
    DynamicFormControlEvent,
    DynamicFormModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormService,
    DynamicTemplateDirective,
} from "@ng-dynamic-forms/core";
import { DynamicNGxBootstrapFormControlContainerComponent } from "./dynamic-ngx-bootstrap-form-control-container.component";

@Component({
    selector: "dynamic-ngx-bootstrap-form",
    templateUrl: "./dynamic-ngx-bootstrap-form.component.html"
})
export class DynamicNGxBootstrapFormComponent extends DynamicFormComponent {

    @Input("group") formGroup: FormGroup;
    @Input("model") formModel: DynamicFormModel;
    @Input("layout") formLayout: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("bsEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicNGxBootstrapFormControlContainerComponent) components: QueryList<DynamicNGxBootstrapFormControlContainerComponent>;

    constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {
        super(formService, layoutService);
    }
}
