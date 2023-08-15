import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
    MatAutocomplete,
    MatAutocompleteDefaultOptions,
    MatAutocompleteSelectedEvent,
    MatAutocompleteModule
} from "@angular/material/autocomplete";
import { MAT_CHIPS_DEFAULT_OPTIONS, MatChipInputEvent, MatChipGrid, MatChipsDefaultOptions, MatChipsModule } from "@angular/material/chips";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions, MatOptionModule } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { MatIconModule } from "@angular/material/icon";
import { NgClass, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-material-chips",
    templateUrl: "./dynamic-material-chips.component.html",
    standalone: true,
    imports: [MatFormFieldModule, ReactiveFormsModule, NgClass, MatChipsModule, NgFor, MatIconModule, MatInputModule, MatAutocompleteModule,
        MatOptionModule, AsyncPipe]
})
export class DynamicMaterialChipsComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matAutocomplete", {static: true}) matAutocomplete!: MatAutocomplete;
    @ViewChild("matChipGrid", {static: true}) matChipGrid!: MatChipGrid;
    @ViewChild(MatInput, {static: true}) matInput!: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS) public AUTOCOMPLETE_OPTIONS: MatAutocompleteDefaultOptions,
                @Inject(MAT_CHIPS_DEFAULT_OPTIONS) public CHIPS_OPTIONS: MatChipsDefaultOptions,
                @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) @Optional() public FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions,
                @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) @Optional() public RIPPLE_OPTIONS: RippleGlobalOptions) {
        super(layoutService, validationService);
    }

    get chips(): string[] {
        return Array.isArray(this.model.value) ? this.model.value as string[] : [];
    }

    onChipInputTokenEnd($event: MatChipInputEvent): void {
        const inputElement = $event.chipInput?.inputElement;
        const inputValue = $event.value.trim();

        if (inputValue.length > 0) {
            this.control.patchValue([...this.chips, inputValue]);
            this.onChange($event);
        }

        if (inputElement instanceof HTMLInputElement) {
            inputElement.value = "";
        }
    }

    onChipSelected($event: MatAutocompleteSelectedEvent): void {
        const selectedChip = $event.option.value;
        const chips = this.chips;

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
