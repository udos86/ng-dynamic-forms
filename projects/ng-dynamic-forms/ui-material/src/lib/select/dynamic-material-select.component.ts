import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    ErrorStateMatcher,
    LabelOptions,
    MAT_LABEL_GLOBAL_OPTIONS,
    MAT_RIPPLE_GLOBAL_OPTIONS,
    MatSelect,
    RippleGlobalOptions
} from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSelectModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-select",
    templateUrl: "./dynamic-material-select.component.html"
})
export class DynamicMaterialSelectComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matSelect") matSelect: MatSelect;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(ErrorStateMatcher) public errorStateMatcher: ErrorStateMatcher,
                @Inject(MAT_LABEL_GLOBAL_OPTIONS) @Optional() public LABEL_OPTIONS: LabelOptions,
                @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) @Optional() public RIPPLE_OPTIONS: RippleGlobalOptions) {

        super(layoutService, validationService);
    }
}