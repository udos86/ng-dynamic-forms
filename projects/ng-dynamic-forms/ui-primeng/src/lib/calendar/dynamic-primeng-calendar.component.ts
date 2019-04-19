import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Calendar } from "primeng/primeng";
import {
    DynamicDatePickerModel, 
    DynamicFormControlCustomEvent,
    DynamicDateControlValue,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicTimePickerModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-primeng-calendar",
    templateUrl: "./dynamic-primeng-calendar.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGCalendarComponent extends DynamicFormControlComponent {

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel | DynamicTimePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pCalendar") pCalendar: Calendar;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get focusedDate(): DynamicDateControlValue | null {
        return (this.model as DynamicDatePickerModel).focusedDate || null;
    }

    get inline(): boolean {
        return (this.model as DynamicDatePickerModel).inline || false;
    }

    get showSeconds(): boolean {
        return (this.model as DynamicTimePickerModel).showSeconds || false;
    }
}