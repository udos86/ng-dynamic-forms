import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Optional,
    Output,
    ViewChild
} from "@angular/core";
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
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicInputModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-chips",
    templateUrl: "./dynamic-material-chips.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicMaterialChipsComponent extends DynamicFormControlComponent {

    private _chipList: string[];
    private _model: DynamicInputModel;

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;

    @Input()
    get model(): DynamicInputModel {
        return this._model;
    }

    set model(model: DynamicInputModel) {
        this._model = model;
        this._chipList = model.value as string[] || [];
    }

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

    get chipList(): string[] {
        return this._chipList;
    }

    onChipInputTokenEnd($event: MatChipInputEvent): void {

        let inputElement = $event.input,
            inputValue = $event.value.trim();

        if (Array.isArray(this.chipList) && inputValue.length > 0) {

            this.chipList.push(inputValue);
            this.control.patchValue(this.chipList);
        }

        if (inputElement instanceof HTMLInputElement) {
            inputElement.value = "";
        }
    }

    onChipRemoved(chip: string, index: number): void {

        if (Array.isArray(this.chipList) && this.chipList[index] === chip) {

            this.chipList.splice(index, 1);
            this.control.patchValue(this.chipList);
        }
    }
}