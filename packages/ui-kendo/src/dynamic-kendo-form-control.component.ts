import {
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild
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
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicDatePickerModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER
} from "@ng-dynamic-forms/core";
import {
    KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    KENDO_CALENDAR_TEMPLATE_DIRECTIVES,
    KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES,
    KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES,
    KENDO_UPLOAD_TEMPLATE_DIRECTIVES,
    KENDO_VIEW_CHILD_SELECTOR,
    KendoFormControlType
} from "./dynamic-kendo-form.const";

export type KendoFormControlComponent = AutoCompleteComponent | CalendarComponent | DateInputComponent |
    DatePickerComponent | DropDownListComponent | MaskedTextBoxComponent | MultiSelectComponent |
    NumericTextBoxComponent | SliderComponent | SwitchComponent | TimePickerComponent | UploadComponent;

@Component({
    selector: "dynamic-kendo-form-control,dynamic-form-kendo-control",
    templateUrl: "./dynamic-kendo-form-control.component.html"
})
export class DynamicKendoFormControlComponent extends DynamicFormControlComponent implements OnChanges {

    @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;
    @Input("templates") inputTemplates: QueryList<DynamicTemplateDirective>;

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel | null = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ViewChild(KENDO_VIEW_CHILD_SELECTOR) kendoViewChild: KendoFormControlComponent | undefined;

    type: KendoFormControlType | null;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
                protected validationService: DynamicFormValidationService) {

        super(changeDetectorRef, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = DynamicKendoFormControlComponent.getFormControlType(this.model);
        }
    }

    protected setTemplateDirective(directive: DynamicTemplateDirective): void {

        if (this.kendoViewChild && (directive.modelId === this.model.id || directive.modelType === this.model.type)) {

            let templateDirectives: any = DynamicKendoFormControlComponent.getTemplateDirectives(this.kendoViewChild);

            Object.keys(templateDirectives || ({} as any)).forEach((key: string) => {

                if (templateDirectives[key] === directive.as) {
                    (this.kendoViewChild as any)[key] = directive;
                }
            });
        }
    }

    protected setTemplates(): void {

        super.setTemplates();

        this.templates
            .filter(directive => typeof directive.as === "string" && directive.as.startsWith("kendo"))
            .forEach(directive => this.setTemplateDirective(directive));
    }

    onFocus($event: null): void {

        this.focus.emit(
            {
                $event: $event,
                context: this.context,
                control: this.control,
                group: this.group,
                model: this.model
            }
        );
    }

    onBlur($event: null): void {

        this.blur.emit(
            {
                $event: $event,
                context: this.context,
                control: this.control,
                group: this.group,
                model: this.model
            }
        );
    }

    static getFormControlType(model: DynamicFormControlModel): KendoFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return KendoFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return KendoFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                return KendoFormControlType.CheckboxGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                let datepickerModel = model as DynamicDatePickerModel;

                return datepickerModel.inline ? KendoFormControlType.Calendar : KendoFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
                return KendoFormControlType.Upload;

            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return KendoFormControlType.Group;

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

    static getTemplateDirectives(component: KendoFormControlComponent): any | null {

        switch (component.constructor) {

            case AutoCompleteComponent:
                return KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;

            case CalendarComponent:
            case DatePickerComponent:
                return KENDO_CALENDAR_TEMPLATE_DIRECTIVES;

            case DropDownListComponent:
                return KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;

            case MultiSelectComponent:
                return KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES;

            case UploadComponent:
                return KENDO_UPLOAD_TEMPLATE_DIRECTIVES;

            default:
                return null;
        }
    }
}