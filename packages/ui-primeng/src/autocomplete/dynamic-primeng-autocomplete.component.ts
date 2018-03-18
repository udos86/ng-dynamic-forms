import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { AutoComplete } from "primeng/primeng";

@Component({
    selector: "dynamic-material-input",
    templateUrl: "./dynamic-material-input.component.html"
})
export class DynamicPrimeNGAutoCompleteComponent extends DynamicFormValueControlComponent {

    private suggestions: string[];

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pAutoComplete") pAutoComplete: AutoComplete;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    onAutoComplete(_$event: any): void {

        if(Array.isArray(this.model.list)) {
            this.suggestions = this.model.list.map(item => item);
        }
    }

    get controlViewChild(): AutoComplete {
        return this.pAutoComplete;
    }
}