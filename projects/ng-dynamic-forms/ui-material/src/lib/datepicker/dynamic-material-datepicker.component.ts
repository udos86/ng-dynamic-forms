import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatInput } from "@angular/material/input";
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from "@ng-dynamic-forms/core";
import { MatFormFieldDefaultOptions } from "@angular/material/form-field/form-field";

@Component({
    selector: "dynamic-material-datepicker",
    templateUrl: "./dynamic-material-datepicker.component.html"
})
export class DynamicMaterialDatePickerComponent extends DynamicFormControlComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matDatepicker", { static: true }) matDatePicker: MatDatepicker<any>;
    @ViewChild(MatInput, { static: true }) matInput: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) @Optional() public FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions) {

        super(layoutService, validationService);
    }
}
