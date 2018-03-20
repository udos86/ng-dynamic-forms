import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    Type,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    CalendarComponent,
    DateInputComponent,
    DatePickerComponent,
    TimePickerComponent
} from "@progress/kendo-angular-dateinputs";
import { AutoCompleteComponent, DropDownListComponent, MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import {
    MaskedTextBoxComponent,
    NumericTextBoxComponent,
    SliderComponent,
    SwitchComponent
} from "@progress/kendo-angular-inputs";
import { UploadComponent } from "@progress/kendo-angular-upload";
import {
    DynamicFormArrayGroupModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicDatePickerModel,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
    DynamicFormValueControl
} from "@ng-dynamic-forms/core";

export type KendoFormControlComponent = AutoCompleteComponent | CalendarComponent | DateInputComponent |
    DatePickerComponent | DropDownListComponent | MaskedTextBoxComponent | MultiSelectComponent |
    NumericTextBoxComponent | SliderComponent | SwitchComponent | TimePickerComponent | UploadComponent;

@Component({
    selector: "dynamic-kendo-form-control",
    templateUrl: "./dynamic-kendo-form-control.component.html"
})
export class DynamicKendoFormControlComponent extends DynamicFormControlComponent {

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
    @Output("kendoEvent") customEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, componentFactoryResolver, layoutService, validationService);
    }

    get componentType(): Type<DynamicFormValueControl> | null {
        return null
    }
}

export function mapDynamicKendoComponentByModel(model: DynamicFormControlModel): KendoFormControlType | null {

    switch (model.type) {

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
            return KendoFormControlType.Checkbox;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            return KendoFormControlType.CheckboxGroup;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            let datepickerModel = model as DynamicDatePickerModel;

            return datepickerModel.inline ? KendoFormControlType.Calendar : KendoFormControlType.DatePicker;

        case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
            return KendoFormControlType.Upload;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
            let inputModel = model as DynamicInputModel;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE) {
                return KendoFormControlType.DateInput;

            } else if (!inputModel.mask && inputModel.list && inputModel.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return KendoFormControlType.AutoComplete;

            } else if (inputModel.mask && inputModel.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return KendoFormControlType.MaskedTextBox;

            } else if (!inputModel.mask && inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                return KendoFormControlType.NumericTextBox;

            } else {
                return KendoFormControlType.Input;
            }

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
            return KendoFormControlType.RadioGroup;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
            let selectModel = model as DynamicSelectModel<any>;

            return selectModel.multiple ? KendoFormControlType.MultiSelect : KendoFormControlType.DropDownList;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
            return KendoFormControlType.Slider;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
            return KendoFormControlType.Switch;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
            return KendoFormControlType.TextArea;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
            return KendoFormControlType.TimePicker;

        default:
            return null;
    }
}