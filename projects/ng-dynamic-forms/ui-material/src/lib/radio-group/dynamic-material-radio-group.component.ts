import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatRadioGroup } from "@angular/material/radio";
import {
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-radio-group",
    templateUrl: "./dynamic-material-radio-group.component.html"
})
export class DynamicMaterialRadioGroupComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: FormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matRadioGroup", {static: true}) matRadioGroup!: MatRadioGroup;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
