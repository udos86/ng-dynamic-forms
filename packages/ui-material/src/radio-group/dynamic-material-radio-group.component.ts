import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatRadioGroup } from "@angular/material";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-material-radio-group",
    templateUrl: "./dynamic-material-radio-group.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicMaterialRadioGroupComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicRadioGroupModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matRadioGroup") matRadioGroup: MatRadioGroup;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}