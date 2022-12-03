import { Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { CalendarComponent } from "@progress/kendo-angular-dateinputs";
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { KENDO_TEMPLATE_DIRECTIVES } from "../dynamic-kendo-form.const";
import { DynamicKendoFormControlWithTemplateComponent } from "../dynamic-kendo-form-control-with-template.component";

@Component({
    selector: "dynamic-kendo-calendar",
    templateUrl: "./dynamic-kendo-calendar.component.html"
})
export class DynamicKendoCalendarComponent extends DynamicKendoFormControlWithTemplateComponent {
    readonly templateDirectives = KENDO_TEMPLATE_DIRECTIVES;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoCalendar", {static: true}) kendoCalendar!: CalendarComponent;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    get viewChild(): CalendarComponent {
        return this.kendoCalendar;
    }
}
