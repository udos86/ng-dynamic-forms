import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Checkbox } from "@ionic/angular";
import { FormGroup } from "@angular/forms";
import {
    DynamicCheckboxModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ionic-checkbox",
    templateUrl: "./dynamic-ionic-checkbox.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicIonicCheckboxComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicCheckboxModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("ionCheckbox") ionCheckbox: Checkbox;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}