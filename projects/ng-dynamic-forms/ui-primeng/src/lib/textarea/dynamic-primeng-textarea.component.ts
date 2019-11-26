import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputTextarea } from "primeng/primeng";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicTextAreaModel, DynamicFormControlLayout
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-textarea",
    templateUrl: "./dynamic-primeng-textarea.component.html"
})
export class DynamicPrimeNGTextAreaComponent extends DynamicFormControlComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicTextAreaModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pInputTextarea", { static: true }) pInputTextArea: InputTextarea;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
