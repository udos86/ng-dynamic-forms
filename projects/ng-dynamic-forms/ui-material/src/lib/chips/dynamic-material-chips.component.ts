import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
    MatAutocomplete,
    MatAutocompleteDefaultOptions,
    MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import {
    MAT_CHIPS_DEFAULT_OPTIONS,
    MatChipInputEvent,
    MatChipList,
    MatChipsDefaultOptions
} from "@angular/material/chips";
import {
    LabelOptions,
    MAT_LABEL_GLOBAL_OPTIONS,
    MAT_RIPPLE_GLOBAL_OPTIONS,
    RippleGlobalOptions
} from "@angular/material/core";
import { MatInput } from "@angular/material/input";
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
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

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matAutocomplete", {static: true}) matAutocomplete: MatAutocomplete;
    @ViewChild("matChipList", {static: true}) matChipList: MatChipList;
    @ViewChild(MatInput, {static: true}) matInput: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS) public AUTOCOMPLETE_OPTIONS: MatAutocompleteDefaultOptions,
                @Inject(MAT_CHIPS_DEFAULT_OPTIONS) public CHIPS_OPTIONS: MatChipsDefaultOptions,
                @Inject(MAT_LABEL_GLOBAL_OPTIONS) @Optional() public LABEL_OPTIONS: LabelOptions,
                @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) @Optional() public RIPPLE_OPTIONS: RippleGlobalOptions) {

        super(layoutService, validationService);
    }

    get chips(): string[] {
        return Array.isArray(this.model.value) ? this.model.value as string[] : [];
    }

    onChipInputTokenEnd($event: MatChipInputEvent): void {

        const inputElement = $event.input,
              inputValue   = $event.value.trim();

        if (inputValue.length > 0) {
            this.control.patchValue([...this.chips, inputValue]);
            this.onChange($event);
        }

        if (inputElement instanceof HTMLInputElement) {
            inputElement.value = "";
        }
    }

    onChipSelected($event: MatAutocompleteSelectedEvent): void {

        const selectedChip = $event.option.value,
              chips        = this.chips;

        if (!chips.includes(selectedChip)) {
            this.control.patchValue([...this.chips, selectedChip]);
        }
    }

    onChipRemoved(chip: string, index: number): void {

        const chips = this.chips;

        if (chips[index] === chip) {

            chips.splice(index, 1);
            this.control.patchValue([...chips]);
        }
    }
}
