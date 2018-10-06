import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LabelOptions, MAT_LABEL_GLOBAL_OPTIONS, MatInput } from "@angular/material";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";
import { DynamicMaterialFormInputControlComponent } from "../dynamic-material-form-input-control.component";

@Component({
    selector: "dynamic-material-textarea",
    templateUrl: "./dynamic-material-textarea.component.html"
})
export class DynamicMaterialTextAreaComponent extends DynamicMaterialFormInputControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicTextAreaModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(MatInput) matInput: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_LABEL_GLOBAL_OPTIONS) @Optional() public LABEL_OPTIONS: LabelOptions) {

        super(layoutService, validationService);
    }
}