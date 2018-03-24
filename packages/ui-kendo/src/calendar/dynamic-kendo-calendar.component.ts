import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarComponent } from "@progress/kendo-angular-dateinputs";
import {
    DynamicDatePickerModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateableFormControlComponent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { KENDO_TEMPLATE_DIRECTIVES } from "../dynamic-kendo-form.const";

@Component({
    selector: "dynamic-kendo-calendar",
    templateUrl: "./dynamic-kendo-calendar.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicKendoCalendarComponent extends DynamicTemplateableFormControlComponent {

    readonly templateDirectives = KENDO_TEMPLATE_DIRECTIVES;

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoCalendar") kendoCalendar: CalendarComponent;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get templateableViewChild(): CalendarComponent {
        return this.kendoCalendar;
    }
}