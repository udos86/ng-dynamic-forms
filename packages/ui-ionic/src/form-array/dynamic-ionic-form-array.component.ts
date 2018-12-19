import { Component, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormArrayComponent,
    DynamicFormArrayModel,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ionic-form-array",
    templateUrl: "./dynamic-ionic-form-array.component.html"
})
export class DynamicIonicFormArrayComponent extends DynamicFormArrayComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormArrayModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}