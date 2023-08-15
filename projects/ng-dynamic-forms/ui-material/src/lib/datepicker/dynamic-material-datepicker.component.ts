import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatInput, MatInputModule } from "@angular/material/input";
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from "@ng-dynamic-forms/core";
import { MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { NgClass, NgIf, NgFor } from "@angular/common";

@Component({
    selector: "dynamic-material-datepicker",
    templateUrl: "./dynamic-material-datepicker.component.html",
    standalone: true,
    imports: [MatFormFieldModule, ReactiveFormsModule, NgClass, NgIf, MatInputModule, MatDatepickerModule, NgFor]
})
export class DynamicMaterialDatePickerComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matDatepicker", {static: true}) matDatePicker!: MatDatepicker<any>;
    @ViewChild(MatInput, {static: true}) matInput!: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) @Optional() public FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions) {
        super(layoutService, validationService);
    }
}
