import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarComponent, DateInputComponent, DatePickerComponent } from "@progress/kendo-angular-dateinputs";
import { AutoCompleteComponent, DropDownListComponent, MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import {
    MaskedTextBoxComponent,
    NumericTextBoxComponent,
    SliderComponent,
    SwitchComponent
} from "@progress/kendo-angular-inputs";
import { UploadComponent } from "@progress/kendo-angular-upload";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicDatePickerModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER, DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE,
} from "@ng2-dynamic-forms/core";
import {
    KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    KENDO_CALENDAR_TEMPLATE_DIRECTIVES,
    KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES,
    KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES,
    KENDO_UPLOAD_TEMPLATE_DIRECTIVES,
    KendoFormControlType
} from "./dynamic-form-kendo.const";
import { DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD } from "../../core/src/model/file-upload/dynamic-file-upload.model";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-kendo-control",
    templateUrl: "./dynamic-form-kendo.component.html"
})

export class DynamicFormKendoComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;

    @Input()set controlGroup(group: FormGroup) {
        this.group = group;
        console.warn("[controlGroup] is deprecated. Use [group] instead.");
    };

    @Input() group: FormGroup;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChild(AutoCompleteComponent) kendoAutoComplete: AutoCompleteComponent | null;
    @ViewChild(CalendarComponent) kendoCalendar: CalendarComponent | null;
    @ViewChild(DateInputComponent) kendoDateInput: DateInputComponent | null;
    @ViewChild(DatePickerComponent) kendoDatePicker: DatePickerComponent | null;
    @ViewChild(DropDownListComponent) kendoDropDownList: DropDownListComponent | null;
    @ViewChild(MaskedTextBoxComponent) kendoMaskedTextBox: MaskedTextBoxComponent | null;
    @ViewChild(MultiSelectComponent) kendoMultiSelect: MultiSelectComponent | null;
    @ViewChild(NumericTextBoxComponent) kendoNumericTextBox: NumericTextBoxComponent | null;
    @ViewChild(SliderComponent) kendoSlider: SliderComponent | null;
    @ViewChild(SwitchComponent) kendoSwitch: SwitchComponent | null;
    @ViewChild(UploadComponent) kendoUpload: UploadComponent | null;

    readonly type: KendoFormControlType;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    protected setKendoTemplateDirective(directive: DynamicTemplateDirective): void {

        let templateDirectives: object,
            viewChild: any;

        if (this.kendoAutoComplete) {

            templateDirectives = KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoAutoComplete;

        } else if (this.kendoCalendar) {

            templateDirectives = KENDO_CALENDAR_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoCalendar;

        } else if (this.kendoDatePicker) {

            templateDirectives = KENDO_CALENDAR_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoDatePicker;

        } else if (this.kendoDropDownList) {

            templateDirectives = KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoDropDownList;

        } else if (this.kendoMultiSelect) {

            templateDirectives = KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoMultiSelect;

        } else if (this.kendoUpload) {

            templateDirectives = KENDO_UPLOAD_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoUpload;
        }

        Object.keys(templateDirectives || {}).forEach((key: string) => {

            if (templateDirectives[key] === directive.type) {
                viewChild[key] = directive;
            }
        });
    }

    protected getFormControlType(): KendoFormControlType | null {

        let model;

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return KendoFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                model = this.model as DynamicDatePickerModel;

                return model.inline ? KendoFormControlType.Calendar : KendoFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
                return KendoFormControlType.Upload;

            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return KendoFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                model = this.model as DynamicInputModel;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE) {
                    return KendoFormControlType.DateInput;

                } else if (!model.mask && model.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.AutoComplete;

                } else if (model.mask && model.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.MaskedTextBox;

                } else if (!model.mask && model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.NumericTextBox;

                } else {
                    return null;
                }

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                model = this.model as DynamicSelectModel<any>;

                return model.multiple ? KendoFormControlType.MultiSelect : KendoFormControlType.DropDownList;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return KendoFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return KendoFormControlType.Switch;

            default:
                return null;
        }
    }

    protected setTemplates(): void {

        super.setTemplates();

        this.templateDirectives
            .filter(directive => directive.type.startsWith("kendo"))
            .forEach(directive => this.setKendoTemplateDirective(directive));
    }
}