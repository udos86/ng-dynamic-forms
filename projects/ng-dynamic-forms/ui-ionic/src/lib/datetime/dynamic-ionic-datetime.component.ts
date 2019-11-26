import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IonDatetime } from "@ionic/angular";
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent, DynamicFormControlLayout
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ionic-datetime",
    templateUrl: "./dynamic-ionic-datetime.component.html"
})
export class DynamicIonicDateTimeComponent extends DynamicFormControlComponent {

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicDatePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("ionDatetime", { static: true }) ionDatetime: IonDatetime;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }
}
