import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatChipInputEvent, MatChipList, MatInput } from "@angular/material";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent,
    DynamicInputModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-chips",
    templateUrl: "./dynamic-material-chips.component.html"
})
export class DynamicMaterialChipsComponent extends DynamicFormValueControlComponent {

    private chipList: string[];
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
        this.chipList = model.value as string[] || [];
    }

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matChipList") matChipList: MatChipList;
    @ViewChild(MatInput) matInput: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    onChipInputTokenEnd($event: MatChipInputEvent): void {

        let inputElement = $event.input, inputValue = $event.value.trim();

        if (Array.isArray(this.chipList) && inputValue.length > 0) {

            this.chipList.push(inputValue);
            this.control.patchValue(this.chipList);
        }

        if (inputElement instanceof HTMLInputElement) {
            inputElement.value = "";
        }
    }

    onChipRemoved(_chip: string, index: number): void {

        if (Array.isArray(this.chipList)) {

            this.chipList.splice(index, 1);
            this.control.patchValue(this.chipList);
        }
    }
}