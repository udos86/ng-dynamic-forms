import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormLayout, DynamicFormLayoutService, DynamicFormValidationService, DynamicFormControlComponent, DynamicInputModel, DynamicFormControlLayout, DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { NgClass, NgIf } from "@angular/common";

@Component({
    selector: "dynamic-kendo-input",
    templateUrl: "./dynamic-kendo-input.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, DynamicFormsCoreModule]
})
export class DynamicKendoInputComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
