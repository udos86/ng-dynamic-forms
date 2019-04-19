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
import { DynamicIonicFormControlContainerComponent } from "./dynamic-ionic-form-control-container.component";

@Component({
    selector: "dynamic-ionic-form",
    templateUrl: "./dynamic-ionic-form.component.html"
})
export class DynamicIonicFormComponent extends DynamicFormComponent {

    @Input("group") formGroup: FormGroup;
    @Input("model") formModel: DynamicFormModel;
    @Input("layout") formLayout: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("ionEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicIonicFormControlContainerComponent) components: QueryList<DynamicIonicFormControlContainerComponent>;

    constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {
        super(formService, layoutService);
    }
}