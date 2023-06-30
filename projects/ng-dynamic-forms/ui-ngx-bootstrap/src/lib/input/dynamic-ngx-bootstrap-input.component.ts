import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormControlComponent, DynamicFormControlLayout, DynamicFormLayout, DynamicFormLayoutService, DynamicFormValidationService, DynamicInputModel, DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { NgxMaskModule } from "ngx-mask";
import { NgIf, NgClass, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-ngx-bootstrap-input",
    templateUrl: "./dynamic-ngx-bootstrap-input.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, DynamicFormsCoreModule, NgClass, NgxMaskModule, NgFor, AsyncPipe]
})
export class DynamicNGxBootstrapInputComponent extends DynamicFormControlComponent {
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
