import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicRadioGroupModel,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";
import { RadioButtonModule } from "primeng/radiobutton";
import { NgClass, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-primeng-radio-group",
    templateUrl: "./dynamic-primeng-radio-group.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgFor, RadioButtonModule, AsyncPipe]
})
export class DynamicPrimeNGRadioGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
