import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicInputModel, DynamicFormControlLayout
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-input",
    templateUrl: "./dynamic-primeng-input.component.html"
})
export class DynamicPrimeNGInputComponent extends DynamicFormControlComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pInputText", { static: true }) pInputText: InputText;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
