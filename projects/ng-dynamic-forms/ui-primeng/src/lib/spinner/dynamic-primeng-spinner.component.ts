import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { Spinner, SpinnerModule } from "primeng/spinner";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicInputModel,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";
import { NgClass } from "@angular/common";

@Component({
    selector: "dynamic-primeng-spinner",
    templateUrl: "./dynamic-primeng-spinner.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, SpinnerModule]
})
export class DynamicPrimeNGSpinnerComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pSpinner", {static: true}) pSpinner!: Spinner;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
