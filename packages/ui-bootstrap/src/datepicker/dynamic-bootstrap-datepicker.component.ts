import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BsDatepickerDirective } from "ngx-bootstrap/datepicker";
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-bootstrap-datepicker",
    templateUrl: "./dynamic-bootstrap-datepicker.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicBootstrapDatePickerComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(BsDatepickerDirective) bsDatePicker: BsDatepickerDirective;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}