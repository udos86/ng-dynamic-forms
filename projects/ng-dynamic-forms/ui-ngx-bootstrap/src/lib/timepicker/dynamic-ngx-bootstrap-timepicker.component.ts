import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TimepickerComponent } from "ngx-bootstrap/timepicker";
import {
    DynamicFormControlComponent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ngx-bootstrap-timepicker",
    templateUrl: "./dynamic-ngx-bootstrap-timepicker.component.html"
})
export class DynamicNGxBootstrapTimePickerComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicTimePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(TimepickerComponent, { static: true }) bsTimePicker: TimepickerComponent;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
