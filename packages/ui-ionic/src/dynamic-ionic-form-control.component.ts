import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList, Type,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Checkbox, DateTime, TextInput, RadioGroup, Range, Select, Toggle } from "ionic-angular";
import {
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER, DynamicFormValueControl
} from "@ng-dynamic-forms/core";

export const enum IonicFormControlType {

    Array = 1, //"ARRAY",
    Checkbox = 2, //"CHECKBOX",
    DateTime = 3, //"DATETIME",
    Group = 4, //"GROUP",
    Input = 5, //"INPUT",
    RadioGroup = 6, //"RADIO_GROUP",
    Range = 7, //"RANGE",
    Select = 8, //"SELECT",
    TextArea = 9, //"TEXTAREA",
    Toggle = 10, //"TOGGLE"
}

@Component({
    selector: "dynamic-ionic-form-control",
    templateUrl: "./dynamic-ionic-form-control.component.html"
})
export class DynamicIonicFormControlComponent extends DynamicFormControlComponent {

    @ContentChildren(DynamicTemplateDirective) contentTemplateList: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplateList: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output("ionEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild(Checkbox) ionCheckbox: Checkbox | undefined;
    @ViewChild(DateTime) ionDateTime: DateTime | undefined;
    @ViewChild(TextInput) ionInput: TextInput | undefined;
    @ViewChild(RadioGroup) ionRadioGroup: RadioGroup | undefined;
    @ViewChild(Range) ionRange: Range | undefined;
    @ViewChild(Select) ionSelect: Select | undefined;
    @ViewChild(Toggle) ionToggle: Toggle | undefined;

    constructor(protected componentFactoryResolver: ComponentFactoryResolver,
                protected changeDetectorRef: ChangeDetectorRef, protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormValueControl> | null {
        return null;
    }
}

export function mapDynamicIonicComponentByModel(model: DynamicFormControlModel): IonicFormControlType | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
            return IonicFormControlType.Array;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return IonicFormControlType.Checkbox;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return IonicFormControlType.DateTime;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
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