import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputSwitch } from "primeng/primeng";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicSwitchModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-input-switch",
    templateUrl: "./dynamic-primeng-input-switch.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGInputSwitchComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicSwitchModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pInputSwitch") pInputSwitch: InputSwitch;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}