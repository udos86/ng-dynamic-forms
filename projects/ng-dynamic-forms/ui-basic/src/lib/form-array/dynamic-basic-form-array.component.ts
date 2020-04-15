import { Component, EventEmitter, forwardRef, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormArrayComponent,
    DynamicFormArrayModel,
    DynamicFormControlContainerComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-basic-form-array",
    templateUrl: "./dynamic-basic-form-array.component.html"
})
export class DynamicBasicFormArrayComponent extends DynamicFormArrayComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicFormArrayModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChildren(forwardRef(() => DynamicFormControlContainerComponent))
    components: QueryList<DynamicFormControlContainerComponent>;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
