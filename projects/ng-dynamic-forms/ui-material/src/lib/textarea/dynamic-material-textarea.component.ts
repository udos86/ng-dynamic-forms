import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";
import { DynamicMaterialFormInputControlComponent } from "../dynamic-material-form-input-control.component";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";

@Component({
    selector: "dynamic-material-textarea",
    templateUrl: "./dynamic-material-textarea.component.html"
})
export class DynamicMaterialTextAreaComponent extends DynamicMaterialFormInputControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: FormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicTextAreaModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(MatInput, {static: true}) matInput!: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) @Optional() public FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions) {
        super(layoutService, validationService);
    }
}
