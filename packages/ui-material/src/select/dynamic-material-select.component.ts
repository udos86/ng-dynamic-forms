import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatSelect } from "@angular/material";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent,
    DynamicSelectModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-select",
    templateUrl: "./dynamic-material-select.component.html"
})
export class DynamicMaterialSelectComponent extends DynamicFormValueControlComponent {

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matSelect") matSelect: MatSelect;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get controlViewChild(): MatSelect {
        return this.matSelect;
    }
}