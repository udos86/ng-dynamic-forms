import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";
import {
    DynamicDatePickerModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ng-bootstrap-calendar",
    templateUrl: "./dynamic-ng-bootstrap-calendar.component.html"
})
export class DynamicNGBootstrapCalendarComponent extends DynamicFormValueControlComponent {

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(NgbDatepicker) ngbCalendar: NgbDatepicker;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}