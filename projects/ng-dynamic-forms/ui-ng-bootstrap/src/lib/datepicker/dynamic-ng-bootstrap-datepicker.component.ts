import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbDatepicker, NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";
import {
    DynamicDatePickerModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent, DynamicFormControlCustomEvent
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ng-bootstrap-datepicker",
    templateUrl: "./dynamic-ng-bootstrap-datepicker.component.html"
})
export class DynamicNGBootstrapDatePickerComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(NgbDatepicker, { static: false }) ngbDatePicker: NgbDatepicker;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                public config: NgbDatepickerConfig) {

        super(layoutService, validationService);
    }
}
