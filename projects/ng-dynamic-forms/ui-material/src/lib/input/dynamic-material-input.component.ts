import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, MatAutocomplete, MatAutocompleteDefaultOptions } from "@angular/material/autocomplete";
import { ErrorStateMatcher, MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { DynamicMaterialFormInputControlComponent } from "../dynamic-material-form-input-control.component";

@Component({
    selector: "dynamic-material-input",
    templateUrl: "./dynamic-material-input.component.html"
})
export class DynamicMaterialInputComponent extends DynamicMaterialFormInputControlComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matAutocomplete", {static: true}) matAutocomplete: MatAutocomplete;
    @ViewChild(MatInput, {static: true}) matInput: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(ErrorStateMatcher) public errorStateMatcher: ErrorStateMatcher,
                @Inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS) public AUTOCOMPLETE_OPTIONS: MatAutocompleteDefaultOptions,
                @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) @Optional() public FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions,
                @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) @Optional() public RIPPLE_OPTIONS: RippleGlobalOptions) {

        super(layoutService, validationService);
    }
}
