import { Component, Input, Output, EventEmitter, QueryList, ContentChildren, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER
} from "@ng2-dynamic-forms/core";
import {
    Checkbox,
    DateTime,
    TextInput,
    RadioGroup,
    Range,
    Select,
    Toggle
} from "ionic-angular";

export const enum IonicFormControlType {

    Array = 1,
    Checkbox = 2,
    DateTime = 3,
    Group = 4,
    Input = 5,
    RadioGroup = 6,
    Range = 7,
    Select = 8,
    TextArea = 9,
    Toggle = 10
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-ionic-control",
    templateUrl: "./dynamic-form-ionic.component.html"
})

export class DynamicFormIonicComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;

    @Input()set controlGroup(group: FormGroup) {
        this.group = group;
        console.warn("[controlGroup] is deprecated. Use [group] instead.");
    }

    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChild(Checkbox) ionCheckbox: Checkbox | null;
    @ViewChild(DateTime) ionDateTime: DateTime | null;
    @ViewChild(TextInput) ionInput: TextInput | null;
    @ViewChild(RadioGroup) ionRadioGroup: RadioGroup | null;
    @ViewChild(Range) ionRange: Range | null;
    @ViewChild(Select) ionSelect: Select | null;
    @ViewChild(Toggle) ionToggle: Toggle | null;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    protected getFormControlType(): IonicFormControlType | null {

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return IonicFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return IonicFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                return IonicFormControlType.DateTime;

            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return IonicFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return IonicFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return IonicFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return IonicFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return IonicFormControlType.Range;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return IonicFormControlType.Toggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return IonicFormControlType.TextArea;

            default:
                return null;
        }
    }
}