import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { NgbDatepicker, NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";
import {
    DynamicDatePickerModel,
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ng-bootstrap-calendar",
    templateUrl: "./dynamic-ng-bootstrap-calendar.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicNGBootstrapCalendarComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild(NgbDatepicker, {static: true}) ngbCalendar!: NgbDatepicker;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                public config: NgbDatepickerConfig) {
        super(layoutService, validationService);
    }
}
