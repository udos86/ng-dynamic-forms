import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Checkbox } from "primeng/checkbox";
import {
    DynamicCheckboxModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent, DynamicFormControlLayout
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-checkbox",
    templateUrl: "./dynamic-primeng-checkbox.component.html"
})
export class DynamicPrimeNGCheckboxComponent extends DynamicFormControlComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicCheckboxModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pCheckbox", { static: true }) pCheckbox: Checkbox;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
