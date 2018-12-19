import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Checkbox } from "primeng/primeng";
import {
    DynamicCheckboxModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-checkbox",
    templateUrl: "./dynamic-primeng-checkbox.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGCheckboxComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicCheckboxModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pCheckbox") pCheckbox: Checkbox;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}