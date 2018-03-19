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
import { DynamicKendoFormControlComponent } from "./dynamic-kendo-form-control.component";

@Component({
    selector: "dynamic-kendo-form",
    templateUrl: "./dynamic-kendo-form.component.html"
})
export class DynamicKendoFormComponent extends DynamicFormComponent {

    @Input("group") formGroup: FormGroup;
    @Input("model") formModel: DynamicFormControlModel[];
    @Input("layout") formLayout: DynamicFormLayout;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("kendoEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChildren(DynamicKendoFormControlComponent) components: QueryList<DynamicKendoFormControlComponent>;

    constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {
        super(formService, layoutService);
    }
}