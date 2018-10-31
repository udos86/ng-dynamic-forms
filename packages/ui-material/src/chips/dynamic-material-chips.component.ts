import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    LabelOptions,
    MAT_CHIPS_DEFAULT_OPTIONS,
    MAT_LABEL_GLOBAL_OPTIONS,
    MatChipInputEvent,
    MatChipList,
    MatChipsDefaultOptions,
    MatInput
} from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-chips",
    templateUrl: "./dynamic-material-chips.component.html"
})
export class DynamicMaterialChipsComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matChipList") matChipList: MatChipList;
    @ViewChild(MatInput) matInput: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_CHIPS_DEFAULT_OPTIONS) public CHIPS_OPTIONS: MatChipsDefaultOptions,
                @Inject(MAT_LABEL_GLOBAL_OPTIONS) @Optional() public LABEL_OPTIONS: LabelOptions) {

        super(layoutService, validationService);
    }

    get chips(): string[] {
        return Array.isArray(this.model.value) ? this.model.value as string[] : [];
    }

    onChipInputTokenEnd($event: MatChipInputEvent): void {

        let inputElement = $event.input,
            inputValue = $event.value.trim();

        if (inputValue.length > 0) {
            this.control.patchValue([...this.chips, inputValue]);
        }

        if (inputElement instanceof HTMLInputElement) {
            inputElement.value = "";
        }
    }

    onChipRemoved(chip: string, index: number): void {

        const chips = this.chips;

        if (chips[index] === chip) {
            this.control.patchValue(chips.splice(index, 1));
        }
    }
}
