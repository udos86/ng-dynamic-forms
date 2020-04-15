import { Component, EventEmitter, forwardRef, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlCustomEvent,
    DynamicFormGroupComponent,
    DynamicFormGroupModel,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DynamicFormControlContainerComponent
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-basic-form-group",
    templateUrl: "./dynamic-basic-form-group.component.html"
})
export class DynamicBasicFormGroupComponent extends DynamicFormGroupComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicFormGroupModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

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
