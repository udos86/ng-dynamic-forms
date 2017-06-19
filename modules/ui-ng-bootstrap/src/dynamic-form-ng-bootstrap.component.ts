import { Component, ContentChildren, Input, EventEmitter, OnInit, Output, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicDatePickerModel
} from "@ng2-dynamic-forms/core";

export const enum NGBootstrapFormControlType {

    Array = 1, //"ARRAY",
    Calendar = 2, //"CALENDAR",
    Checkbox = 3, //"CHECKBOX",
    DatePicker = 4, //"DATEPICKER",
    Group = 5, //"GROUP",
    Input = 6, //"INPUT",
    RadioGroup = 7, //"RADIO_GROUP",
    Select = 8, //"SELECT",
    TextArea = 9, //"TEXTAREA",
    TimePicker = 10, //"TIMEPICKER"
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-ng-bootstrap-control",
    templateUrl: "./dynamic-form-ng-bootstrap.component.html"
})
export class DynamicFormNGBootstrapComponent extends DynamicFormControlComponent implements OnInit {

    @Input() asBootstrapFormGroup: boolean = true;
    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    type: NGBootstrapFormControlType | null;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.type = DynamicFormNGBootstrapComponent.getFormControlType(this.model);
    }

    static getFormControlType(model: DynamicFormControlModel): NGBootstrapFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return NGBootstrapFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return NGBootstrapFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return NGBootstrapFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                let datepickerModel = model as DynamicDatePickerModel;

                return datepickerModel.inline ? NGBootstrapFormControlType.Calendar : NGBootstrapFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return NGBootstrapFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return NGBootstrapFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return NGBootstrapFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return NGBootstrapFormControlType.TextArea;

            case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                return NGBootstrapFormControlType.TimePicker;

            default:
                return null;
        }
    }
}