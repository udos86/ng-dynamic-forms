import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarComponent } from "@progress/kendo-angular-dateinputs";
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { KENDO_TEMPLATE_DIRECTIVES } from "../dynamic-kendo-form.const";
import { DynamicKendoTemplateableFormControlComponent } from "../dynamic-kendo-templateable-form-control.component";

@Component({
    selector: "dynamic-kendo-calendar",
    templateUrl: "./dynamic-kendo-calendar.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicKendoCalendarComponent extends DynamicKendoTemplateableFormControlComponent {

    readonly templateDirectives = KENDO_TEMPLATE_DIRECTIVES;

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicDatePickerModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoCalendar") kendoCalendar: CalendarComponent;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get viewChild(): CalendarComponent {
        return this.kendoCalendar;
    }
}