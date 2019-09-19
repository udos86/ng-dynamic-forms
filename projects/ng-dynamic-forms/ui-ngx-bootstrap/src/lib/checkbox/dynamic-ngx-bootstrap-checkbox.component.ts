import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicCheckboxModel,
    DynamicFormControlComponent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ngx-bootstrap-checkbox",
    templateUrl: "./dynamic-ngx-bootstrap-checkbox.component.html"
})
export class DynamicNGxBootstrapCheckboxComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicCheckboxModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
